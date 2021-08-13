import React, { Component } from 'react';
import {  Link } from 'react-router-dom'
import { message } from 'antd';
import Loading from '@/components/Loading'

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            data:[]
        }
    }
    componentDidMount() {
        let value1 = localStorage.getItem('value1'),
            value2 = localStorage.getItem('value2')
        this.getData([value1,value2])
    }
    getData = value => {
        value.map((item,index) => {
            fetch(`https://api.github.com/users/${item}`).then(res => {
                if (res.status === 200||res.status === 304) {
                    return res.json()
                } else {
                    message.error('请求频繁，请稍后再试');
                }
            })
                .then(res => {
                    if(res){
                        let data = this.state.data
                        data.push(res)
                        data.sort((a,b)=>{
                            return b.public_repos-a.public_repos
                        })
                        this.setState({
                            data
                        })
                        if(index===1) this.setState({isLoading:false},()=>{
                            console.log(this.state.data)
                        })
                    }
                }).catch(e => { console.log(e) })
        })

    }
    render() {
        const {data,isLoading} = this.state
        return (
            <div>
                <div style={{display: 'flex',justifyContent:'space-around'}}>
                    {data.map((item,index) => {
                        return (
                            <div style={{backgroundColor: 'rgb(221, 221, 221)',padding: '32px',borderRadius: '4px',marginTop:'50px'}} key={index}>
                                <h2 style={{textAlign:'center'}}>{index===0?'Winner':'Loser'}</h2>
                                <div style={{textAlign: 'center'}}>
                                    <img src={item.avatar_url} alt="" style={{width: '200px',height:'200px'}} />
                                </div>
                                <h3 style={{textAlign: 'center'}}>Scores:{item.public_repos}</h3>
                                <h2 style={{color: '#1890ff'}}>{item.name}</h2>
                                <div>
                                    <i className='fa fa-location-arrow' style={{marginRight: '10px',fontSize: '15px'}}></i>
                                    {item.location}
                                </div>
                                <div>
                                    <i className='fa fa-group' style={{marginRight: '10px',fontSize: '15px'}}></i>
                                    {item.followers}
                                </div>
                                <div>
                                    <i className='fa fa-user-plus' style={{marginRight: '10px',fontSize: '15px'}}></i>
                                    {item.following}
                                </div>
                                <div>
                                    <i className='fa fa-code' style={{marginRight: '10px',fontSize: '15px'}}></i>
                                    {item.public_repos}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div style={{marginTop:'30px',textAlign: 'center'}}>
                    <button><Link to='/Battle'>RESET</Link></button>
                </div>
                <Loading isLoading={isLoading} />
            </div>
        );
    }
}

export default Details;