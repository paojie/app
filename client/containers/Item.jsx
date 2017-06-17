import React from 'react'
import {connect} from 'react-redux'
import Item from '../components/Item/Item'

function mapStateToProps(state) {
    const { postsByAuthor,selectedAuthor,user} = state

    const {
        items: posts
    } = postsByAuthor[selectedAuthor]

    return {
        posts: posts||[],
        user,
        selectedAuthor
    }
}

export default connect(mapStateToProps)(Item)