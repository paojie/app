import React from 'react'
import {connect} from 'react-redux';
import Login from '../components/Login/Login'



function mapStateToProps(state) {
    const {user} = state
        return {
            user
    }
}
export default connect(mapStateToProps)(Login)

//  const Login = props => (
//     <div>sb</div>
// )
// export default Login