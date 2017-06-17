import React from 'react'
import 'whatwg-fetch' 
import 'es6-promise'
import './Login.scss'
import {browserHistory} from 'react-router'
import {logIn, fetchUser} from '../../actions/actions'


class Login extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this
            .handleClick
            .bind(this)
        this.state = {
            name: '',
            passwd: ''
        }
    }

    handleClick() {
        const {dispatch} = this.props
        const {name, passwd} = this.state

        const content = JSON.stringify({name, passwd})

        fetch('http://localhost:80/api/signin', { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Content-Length": content
                    .length
                    .toString()
            },
            body: content
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then((token) => {
            if (token) {
                console.log('browser' + token);
                localStorage.setItem('token', token)
                console.log('latter' + token);
                dispatch(fetchUser())
                browserHistory.push('/')
            } else {
                console.log('登陆失败');
            }
        })
    }

    render() {
        const {name, passwd} = this.state

        return (
            <div id='login'>
                <h1>登陆</h1>                
                <div className='lin-box'>
                    <label>name</label>
                    <div><input
                        type="text"
                        onChange={(e) => {
                        this.setState({name: e.target.value})
                    }}/></div>
                </div>
                <div className='lin-box'>
                    <label>password</label>
                    <div><input 
                        type="text" 
                        onChange={(e)=>{
                        this.setState({passwd:e.target.value})
                    }}/></div>
                </div>
                <div className='line'></div>
                <div>
                    <button onClick={this.handleClick} className='lin-btn'>登陆</button>
                </div>
            </div>
        )
    }
}

export default Login