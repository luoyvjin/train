import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { message } from 'antd';
import Menu from '@/components/Menu'
import CardList from '@/components/List'
import Loading from '@/components/Loading'
// import './popular.less'

class App extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            infinitKey: this.props?.history.location.search ? this.getUrl('tab') : 'All',//增加无限滚动key值以便切换时重置page
            url: {
                'All': 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories',
                'JavaScript': 'https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories',
                'Ruby': 'https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories',
                'Java': 'https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories',
                'CSS': 'https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories'
            },
            hasMore: true, // 是否开启下拉加载
            pageUrl: 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories',
            isLoading: false,//加载状态
        }
        console.log(this.props?.history.location.search)
    }
    componentDidMount() {
        if (this.props.history.location.search) {
            this.setState({
                pageUrl: this.state.url[this.getUrl('tab')],
                infinitKey: this.getUrl('tab')
            }, () => { this.loadMoreData(1) })
        } else {
            this.loadMoreData(1)
        }
    }
    getUrl = (variable) => {
        let query = this.props?.history.location.search.substring(1);
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
    }
    // 加载更多数据
    loadMoreData = (page = 1) => {
        const { pageUrl } = this.state
        this.setState({ isLoading: true, hasMore: false }, () => {
            this.getData(`${pageUrl}&page=${page}`)
        })
    }
    //获取数据
    getData = (url = 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories') => {
        let { list } = this.state
        fetch(url).then(res => {
            if (res.status === 200 || res.status === 304) {
                return res.json()
            } else {
                message.error('请求频繁，请稍后再试');
            }
        })
            .then(res => {
                if (res.items) {
                    this.setState({ list: [...list, ...res.items], hasMore: true })
                }
            }).catch(e => {
                console.log(e)
            }).finally(() => {
                this.setState({ isLoading: false })
            })

    }
    //切换
    onSwitch = str => {
        const { history, match } = this.props;
        history.push(`${match.path}?tab=${str}`);
        this.setState({ list: [], pageUrl: this.state.url[str], infinitKey: str, isLoading: true }, () => { this.loadMoreData(1) })
    }
    render() {
        const { list, hasMore, infinitKey,isLoading } = this.state
        return (
            <div className='a'>
                <Menu onSwitch={this.onSwitch} infinitKey={infinitKey} />
                <CardList loadMoreData={this.loadMoreData} hasMore={hasMore} infinitKey={infinitKey} list={list}/>
                <Loading isLoading={isLoading} />
            </div>
        );
    }
}

export default App;