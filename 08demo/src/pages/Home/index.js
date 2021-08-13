import React, { Component,lazy, Suspense } from 'react';
import Popular from '@/pages/Popular';
// import Battle from '@/Battle';
import { HashRouter, Route, Link } from 'react-router-dom'
// import Details from '@/Details';
const Battle = lazy(() => import('@/pages/Battle'));
const Details = lazy(() => import('@/pages/Details'));

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: location.hash.substring(1)?location.hash.substring(1):'/'
        }
    }
    onSwitch = str => {
        this.setState({ pageName: str })
    }
    render() {
        const { pageName } = this.state
        return (
            <div style={{padding: '0 32px'}}>
                <Suspense fallback={<div>Loading...</div>}>
                <HashRouter >
                    <div style={{ display: 'flex', paddingLeft: "30px" ,marginTop:'30px'}}>
                        <div onClick={() => { this.onSwitch('/') }} style={{ marginRight: '20px', cursor: 'pointer' }}>
                            <Link to='/' style={{ color: (pageName !== '/Battle'&&pageName !== '/Details') ? 'red' : '#000' }}>Popular</Link>
                        </div>
                        <div onClick={() => { this.onSwitch('/Battle') }} style={{ cursor: 'pointer' }}>
                            <Link to='/Battle' style={{ color: (pageName === '/Battle'||pageName === '/Details') ? 'red' : '#000' }}>Battle</Link>
                        </div>
                    </div>
                    <Route  path="/Battle" component={Battle} />
                    <Route  path="/Details" component={Details} />
                    <Route exact path="/" component={Popular} />
                </HashRouter>
                </Suspense>
            </div>
        );
    }
}

export default Home;