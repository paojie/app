import React from 'react'
import {connect} from 'react-redux'
import Home from '../components/Home/Home'


function mapStateToProps(state) {
    const { selectedAuthor, postsByAuthor, item, user } = state

    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsByAuthor[selectedAuthor] || {
        isFetching: true,
        items: []
  }

    return {
        selectedAuthor,
        posts: posts || [],
        isFetching,
        lastUpdated,
        item,
        user
    }

}

export default connect(mapStateToProps)(Home)