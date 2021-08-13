import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {  Link } from 'react-router-dom'
import  '@/pages/Battle/index.scss';

class Battle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inp1:localStorage.getItem('value1')?localStorage.getItem('value1'):'',
            inp2:localStorage.getItem('value2')?localStorage.getItem('value2'):'',
            flage1:false,
            falge2:false
        }
    }
    onValue1Change = e => {
        this.setState({inp1:e.target.value})
        localStorage.setItem('value1',e.target.value)
        if(!e.target.value){
            this.setState({flage1:false})
        }
    }
    onValue2Change= e =>{
        this.setState({inp2:e.target.value})
        localStorage.setItem('value2',e.target.value)
        if(!e.target.value){
            this.setState({flage2:false})
        }
    }
    btn1Click = () =>{
        this.setState({flage1:true})
    }
    btn2Click = () =>{
        this.setState({flage2:true})
    }
    removeInp2 = () => {
        this.setState({flage2:false,inp2:''})
    }
    removeInp1 = () => {
        this.setState({flage1:false,inp1:''})
    }
    toDetails = () => {
        const { history, match } = this.props;
        const {inp1,inp2} = this.state
        // console.log(match.path)
        history.push(`/Details?value1=${inp1}&value2=${inp2}`);
    }
    
    render() {
        return (
            <div style={{padding: '0 30px'}}>
                <div style={{ textAlign: 'center', fontSize: '30px', margin: '20px 0', fontWeight: 'bold' }}>Instructions</div>
                <div style={{ display: 'flex', width: '600px', margin: '0 auto' }}>

                    <div style={{ width: '190px', textAlign: 'center' }}>
                        <p>Enter two Github:</p>
                        <div style={{ background: '#eee', padding: '20px' }}>
                            <i className='fa fa-users' style={{ fontSize: '150px', color: '#ffbf74' }}></i>
                        </div>
                    </div>

                    <div style={{ width: '190px', textAlign: 'center', margin: '0 15px' }}>
                        <p>Battle</p>
                        <div style={{ background: '#eee', padding: '20px' }}>
                            <i className='fa fa-fighter-jet' style={{ fontSize: '150px', color: '#808080' }}></i>
                        </div>
                    </div>
                    <div style={{ width: '190px', textAlign: 'center' }}>
                        <p>See the winner</p>
                        <div style={{ background: '#eee', padding: '20px' }}>
                            <i className='fa fa-fighter-jet' style={{ fontSize: '150px', color: '#808080' }}></i>
                        </div>
                    </div>
                </div>
                <div style={{textAlign: 'center',margin: '10px 0',fontSize:'25px',fontWeight:'bold'}}>Players</div>
                <div style={{display: 'flex',justifyContent:'space-between'}}>
                    <div style={{width: '50%',paddingRight:'20px'}}>
                        <p style={{fontSize:'25px',fontWeight:'bold'}}>Player One</p>
                        {this.state.flage1?
                        <div style={{display: 'flex',
                        justifyContent:'space-between',
                        background: '#dfdfdf',
                        alignItems:'center',
                        padding:'20px',
                        borderRadius: '10px'
                        }}>
                            <img style={{width: '64px'}} src={`https://github.com/${this.state.inp1}.png?size=200`} alt="" />
                            <div style={{flexGrow: '1',textAlign: 'left',paddingLeft: '10px',fontSize:'32px',color: '#1890ff'}}>{this.state.inp1}</div>
                            <div style={{width: '42px',
                            lineHeight:'42px',
                            background: '#f5222d',
                            color: '#fff',
                            textAlign: 'center',
                            borderRadius: '50%',
                            fontSize:'25px',
                            fontWeight:'bold',
                            cursor: 'pointer'
                            }}
                            onClick={this.removeInp1}
                            >X</div>
                        </div>:
                        <div>
                            <input type="text" placeholder='github username' value={this.state.inp1} onChange={this.onValue1Change} style={{width: '60%',height:'40px'}}/>,
                        <button style={{width: '35%',marginLeft: '10px',height:'40px'}} onClick={this.btn1Click} disabled={this.state.inp1===''}>Submit</button>
                        </div>
                        }
                    </div>
                    <div style={{width: '50%'}}>
                        <p style={{fontSize:'25px',fontWeight:'bold'}}>Player Two</p>
                        {
                        this.state.flage2?<div style={{display: 'flex',
                        justifyContent:'space-between',
                        background: '#dfdfdf',
                        alignItems:'center',
                        padding:'20px',
                        borderRadius: '10px'
                        }}>
                            <img style={{width: '64px'}} src={`https://github.com/${this.state.inp2}.png?size=200`} alt="" />
                            <div style={{flexGrow: '1',textAlign: 'left',paddingLeft: '10px',fontSize:'32px',color: '#1890ff'}}>{this.state.inp2}</div>
                            <div style={{width: '42px',
                            lineHeight:'42px',
                            background: '#f5222d',
                            color: '#fff',
                            textAlign: 'center',
                            borderRadius: '50%',
                            fontSize:'25px',
                            fontWeight:'bold',
                            cursor: 'pointer'
                            }}
                            onClick={this.removeInp2}
                            >X</div>
                        </div>:
                        <div>
                            <input  type="text" placeholder='github username' value={this.state.inp2} onChange={this.onValue2Change} style={{width: '60%',height:'40px'}}/>,
                        <button style={{width: '35%',marginLeft: '10px',height:'40px'}} onClick={this.btn2Click} disabled={this.state.inp2===''}>Submit</button>
                        </div>
                        }
                    </div>
                </div>
                <div style={{textAlign: 'center',margin: '20px 0'}}>
                    {
                       this.state.flage1&&this.state.flage2?<button onClick={this.toDetails}>
                           <Link to='/Details' >Battle</Link>
                           </button>:''
                    } 
                </div>
            </div>
        );
    }
}

export default Battle;