import React, { Component } from 'react';

class index extends Component {
    render() {
        const {isLoading} = this.props
        return (
            <div style={{
                display: isLoading ? 'block' : 'none',
                textAlign: 'center',
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                left: '0',
                top: '0',
                background: 'rgba(0,0,0,.3)'
            }}>
                <div style={{
                    position: 'absolute',
                    lineHeight: '40px',
                    color: '#fff',
                    top: '50%',
                    marginTop: '-20px',
                    textAlign: 'center',
                    fontSize: '30px',
                    fontWeight: 'bold',
                    width: '100%'
                }}>
                    <i className=" fa fa-spinner fa-spin"></i>
                    加载中。。。
                </div>
            </div>
        );
    }
}

export default index;