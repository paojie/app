import React from 'react'
import 'whatwg-fetch' 
import 'es6-promise'
import { Router, Route, Link,browserHistory } from 'react-router'
import {fetchUser} from '../../actions/actions'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Content from '../Content/Content'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }
    componentWillMount () {
        const {dispatch} = this.props
        dispatch(fetchUser())
    }
    handleLogout() {
        const {dispatch} = this.props
        localStorage.removeItem('token')
        dispatch(fetchUser())
    }
    render() {
        return (
            <div>
                <Header logOut={this.handleLogout} user={this.props.user}/>
                <Content>{this.props.children}</Content>
                
                <Footer />
            </div>
        )
    }
}

export default App