import React, { Component } from 'react';

class index extends Component {
    render() {
        return (
            <div style={styles.nav}>
                    <div onClick={() => { this.props.onSwitch('All') }} style={{ cursor: 'pointer', margin: '0 20px', color: this.props.infinitKey === 'All' ? 'red' : '' }}>All</div>
                    <div onClick={() => { this.props.onSwitch('JavaScript') }} style={{ cursor: 'pointer', margin: '0 20px', color: this.props.infinitKey === 'JavaScript' ? 'red' : '' }}>JavaScript</div>
                    <div onClick={() => { this.props.onSwitch('Ruby') }} style={{ cursor: 'pointer', margin: '0 20px', color: this.props.infinitKey === 'Ruby' ? 'red' : '' }}>Ruby</div>
                    <div onClick={() => { this.props.onSwitch('Java') }} style={{ cursor: 'pointer', margin: '0 20px', color: this.props.infinitKey === 'Java' ? 'red' : '' }}>Java</div>
                    <div onClick={() => { this.props.onSwitch('CSS') }} style={{ cursor: 'pointer', margin: '0 20px', color: this.props.infinitKey === 'CSS' ? 'red' : '' }}>CSS</div>
                </div>
        );
    }
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '10px 0'
    }
}
export default index;