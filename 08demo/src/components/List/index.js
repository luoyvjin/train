import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller'
import Card from '@/components/Card'

class index extends Component {
   
    render() {
        const {list,infinitKey,hasMore} = this.props
        // console.log(this.props)
        return (
            <InfiniteScroll
                    initialLoad={false} // 不让它进入直接加载
                    pageStart={1} // 设置初始化请求的页数
                    loadMore={this.props.loadMoreData}  // 监听的ajax请求
                    hasMore={hasMore} // 是否继续监听滚动事件 true 监听 | false 不再监听
                    useWindow={true} // 不监听 window 滚动条
                    key={infinitKey}
                    style={{ width: '100%', overflow: 'hidden' }}
                >
                    <div className='row'>
                        {list.map((item, index) => {
                            return (
                                <Card record={item} index={index} key={index} />
                            )
                        })}
                    </div>
                </InfiniteScroll>
        );
    }
}

export default index;