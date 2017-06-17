import React from 'react'
import Posts from '../Posts/Posts'

import {selectAuthor,fetchPostsIfNeeded,invalidatePosts,fetchItem, fetchPosts} from '../../actions/actions'
import './Home.scss'

class Home extends React.Component {
    constructor(props) {
        super(props)

        // this.handleChange = this.handleChange.bind(this)
        // this.handleRefreshClick = this.handleRefreshClick.bind(this)
        this.handleShow = this.handleShow.bind(this)
    }



     // 异步请求拿到数据库数据
    componentDidMount(){

        const {dispatch,selectedAuthor} = this.props;
        dispatch(fetchPosts(selectedAuthor))
    }

    handleShow(id) {
        const {dispatch} = this.props
        dispatch(fetchItem(id))
    }


    render() {
        const { item,selectedAuthor, params,posts, isFetching, lastUpdated,user} = this.props;
        // params : react-router 自带属性

        return(
            <div><Posts posts={posts} onShow={this.handleShow}></Posts></div>
        )
    }
}

export default Home