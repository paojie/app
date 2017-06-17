import React from 'react'

import {connect} from 'react-redux';

import Reg from '../components/Reg/Reg'

const mapStateToProps = (state) => {
    const {user} = state
    return {
        user
    }
}

export default connect(mapStateToProps)(Reg)