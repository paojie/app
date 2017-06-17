import React from 'react'
import { Router, Route, Link } from 'react-router'
import './Posts.scss'

class Posts extends React.Component {
    
    render() {
        const {posts} = this.props

        return (          
            <div>
                {posts.map((post, i) => (
                    <div className='inner'>
                        <div className='left'>{post.author}</div>
                        <span><Link className="link" to={"/item/" + post.flag} >{post.title}</Link></span>
                    </div>
                ))}
            </div>
        )
    }
}

export default Posts
