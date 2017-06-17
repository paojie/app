import React from 'react'
import {connect} from 'react-redux'
import Publish from '../components/Publish/Publish'

function mapStateToProps(state) {
    const {selectedAuthor, user} = state
    
    return {
        user,
        selectedAuthor
    }
 
}

export default connect(mapStateToProps)(Publish)