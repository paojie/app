import React from 'react'
import 'whatwg-fetch' 
import 'es6-promise'
import {browserHistory} from 'react-router';
import {invalidatePosts,fetchUser} from '../../actions/actions'
import './Publish.scss'

class Publish extends React.Component {
    constructor(props) {
        super(props)

        // this.handleSelect = this.handleSelect.bind(this)

        this.state = {
            title: '',
            content: '',
            isFailed: false

        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const {dispatch,selectedAuthor} = this.props
        console.log(this.props);
        const   title = this.state.title,
                postContent = this.state.content,
                access_token = localStorage.getItem('token')

        const content = JSON.stringify({
                title,
                content:postContent,
                access_token
            })

        fetch('http://localhost:80/api/post', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res => {
            if(res.ok) {
                this.state.title = '';
                this.state.content = ''
                dispatch(invalidatePosts(this.props.selectedAuthor));
                dispatch(fetchUser())
                browserHistory.push('/')
            }
        })
    }


    render() {
        return (
            <div className='pub'>
                <h3>发表文章</h3>
                <input type="text" onChange={(e)=>this.setState({title: e.target.value})} className='title'/>
                <h3>内容</h3>
                <div><textarea className='content' type="textarea" ref="content" onChange={(e)=>this.setState({content: e.target.value})} /></div>
                <button className='sub' type="submit" onClick={this.handleClick} >发表</button>
            </div>
        )
    }
}

export default Publish