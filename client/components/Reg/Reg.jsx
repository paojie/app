import React from 'react';
import 'whatwg-fetch' 
import 'es6-promise'
import {browserHistory} from 'react-router';
import {logIn} from '../../actions/actions'


import './Reg.scss'

class Reg extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            passwd: '',
            email: ''
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        const {dispatch} = this.props;
        const {name, passwd, email} = this.state
        const content = JSON.stringify({
                name,
                passwd,
                email
            })

        fetch('http://www.fubd.site/api/signup',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            console.log('mmmmmm');
            if(res.ok){
                console.log('注册成功')
                return res.json()
            }
        }).then(json=>{
            if(json){
                localStorage.setItem('token',json)
                dispatch(logIn({
                    name
                }))
                browserHistory.push('/')
            } else {
                console.log("注册失败")
            }
        })
    }
    render(){
        const { name,passwd } = this.state;
        return (
            <div id="reg">
                    <h1>注册</h1>
                    <div className='lin-box'><label>name</label> <div><input
                        type="text"
                        onChange={(e)=>{
                            this.setState({name:e.target.value})
                        }}
                    /></div></div>
                    <div className='lin-box'><label>password</label><div><input
                        type="text"
                        onChange={(e)=>{
                            this.setState({passwd:e.target.value})
                        }}
                    /></div></div>
                    <div className='lin-box'><label>email</label><div><input type="text"
                           onChange={(e)=>{
                           this.setState({email:e.target.value})
                        }}
                    /></div></div>
                    <div className='line'></div>
                    <div><button onClick={this.handleClick} className='lin-btn' >注册</button></div>
            </div>
        )
    }
}

export default Reg