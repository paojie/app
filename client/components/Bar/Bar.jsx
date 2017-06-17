import React from 'react'
import { Router, Route, Link,browserHistory } from 'react-router'
import './style.scss'
const Bar = ({user, logOut}) => (
    <div id='h-bar'>
        {
            !user.name && 
            <div className='bar-container clearfix'>
                <div className='left'>
                    <span>登陆即可发布文章</span>
                </div>
                <div className='right'>
                    <span>欢迎您访问 请 <Link to='/login'>登陆</Link>或<Link to='/reg'>注册</Link></span>
                </div>
            </div>
        }
        {
            user.name && 
            <div className='bar-login-container'>
                <span style={{}}>{user.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>欢迎您的到来</span> <button onClick={logOut}>退出登陆</button><Link to='/publish'>发表文章</Link>
            </div>
        }
    </div>
)

export default Bar