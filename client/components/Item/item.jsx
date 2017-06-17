import React from 'react'
import './item.scss'

class Item extends React.Component {
    
    render() {
        const {posts, params, user} = this.props

        // 从item数组中找到与当前路由id相匹配的item
        let item = posts.filter((post)=>post.flag === params.id)[0]

        return (
            <div className='detail'>
                <h3>{item.title}</h3>
                <div className='time'><span className='first'>发布于 </span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: '#aaa'}}>{item.time.minute}</span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='first'>作者</span>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: '#aaa'}}>{item.author}</span></div>
                <div className='last'>
                    {item.content}
                </div>
            </div>
        )
    }
}

export default Item