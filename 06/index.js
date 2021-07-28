class Index extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [],
            gage:1,
            url:{
                'All':'https://api.github.com/search/repositories?q=stars:3E1&sort=stars&order=desc&type=Repositories',
                'JavaScript':'https://api.github.com/search/repositories?q=stars:3E1+language:javascript&sort=stars&order=desc&type=Repositories',
                'Ruby':'https://api.github.com/search/repositories?q=stars:3E1+language:ruby&sort=stars&order=desc&type=Repositories',
                'Java':'https://api.github.com/search/repositories?q=stars:3E1+language:java&sort=stars&order=desc&type=Repositories',
                'CSS':'https://api.github.com/search/repositories?q=stars:3E1+language:css&sort=stars&order=desc&type=Repositories'
            }
        }
    }
    componentDidMount = () => {
        this.getData()
    }
    //获取数据
    getData = (url='https://api.github.com/search/repositories?q=stars:3E1&sort=stars&order=desc&type=Repositories') => {
        fetch(url).then(res => res.json())
            .then(res => {
                if (res.items) {
                    this.setState({ list: res.items })
                }
            }).catch(e => { console.log(e) })
    }
    //切换
    onSwitch = str => {
        this.setState({list:[]},()=>{this.getData(this.state.url[str])})
    }
    render() {
        const {list} = this.state
        return (
            <div>
                <div style={styles.nav}>
                    <div onClick={()=>{this.onSwitch('All')}} style={{cursor:'pointer'}}>All</div>
                    <div onClick={()=>{this.onSwitch('JavaScript')}} style={{cursor:'pointer'}}>JavaScript</div>
                    <div onClick={()=>{this.onSwitch('Ruby')}} style={{cursor:'pointer'}}>Ruby</div>
                    <div onClick={()=>{this.onSwitch('Java')}} style={{cursor:'pointer'}}>Java</div>
                    <div onClick={()=>{this.onSwitch('CSS')}} style={{cursor:'pointer'}}>CSS</div>
                </div>
                <div style={styles.content}>
                    {list.map((item,index) => {
                        return (
                            <div style={styles.item} key={item.id}>
                                <h2 style={{textAlign: 'center'}}>#{index+1}</h2>
                                <div style={{textAlign: 'center'}}>
                                <img src={item.owner.avatar_url} style={{width: '150px'}}/>
                                </div>
                                <h3 style={{textAlign: 'center',color: '#b83617'}}><a href={item.owner.html_url}>{item.owner.login}</a></h3>
                                <p style={{paddingLeft: '20px'}}><i className="fa fa-user-circle-o" style={{marginRight: '10px'}}></i><a href={item.owner.html_url}>{item.owner.login}</a></p>
                                <p style={{paddingLeft: '20px'}}><i className="fa fa-star" style={{marginRight: '10px'}}></i>{item.stargazers_count}<span style={{marginLeft: '10px'}}>stars</span></p>
                                <p style={{paddingLeft: '20px'}}><i className="fa fa-code-fork" style={{marginRight: '10px'}}></i>{item.forks_count}<span style={{marginLeft: '10px'}}>forks</span></p>
                                <p style={{paddingLeft: '20px'}}><i className="fa fa-warning" style={{marginRight: '10px'}}></i>{item.open_issues_count}<span style={{marginLeft: '10px'}}>open issues</span></p>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    content:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    item:{
        backgroundColor: '#ebebeb',
        width: '24%',
        marginBottom: '10px'
    }
}
ReactDOM.render(
    <Index />,
    document.getElementById('app')
)