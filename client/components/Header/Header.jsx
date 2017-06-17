import React from 'react'
import Bar from '../Bar/Bar'
import './Header.scss'

const Header = ({user, logOut}) => (

    <div id='header'>
        <Bar user={user} logOut={logOut}></Bar>
        <div ><h1 className='h-title'>我的个人网站</h1></div>
    </div>
)

export default Header