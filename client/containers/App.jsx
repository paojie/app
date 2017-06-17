import React from 'react'
import {connect} from 'react-redux';
import App from '../components/App/App.jsx';
import {fetchUser} from '../actions/actions'
// const mapState = (state) => {

//     const {user} = state   
//     return {
//         user
//     }
// }

function mapStateToProps(state) {
    const {user} = state   
    return {
        user
    }  
}


// function mapDispatchToPorps(dispatch, ownProps) {
//     return {
//         handleLogout: () => {
//             localStorage.removeItem('token')
//             dispatch(fetchUser())
//         }
//     }
// }

export default connect(mapStateToProps)(App)




