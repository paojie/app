import React from 'react'
// import {Route,IndexRoute} from 'react-router';
import App from './containers/App.jsx'
import Home from './containers/Home.jsx'
import Login from './containers/Login.jsx'
import Reg from './containers/Reg.jsx'
import Publish from './containers/Publish.jsx'
import Item from './containers/Item.jsx'

import { Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router'

class Routemap extends React.Component {
    render () {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App} >
                    <IndexRoute component={Home} />
                    <Route path="/login" component={Login}/>
                    <Route path="/reg" component={Reg}/>
                    <Route path="/publish" component={Publish}/>
                    <Route path="/item/:id" component={Item}/>
                 </Route>
            </Router>
        )
    }
}

export default Routemap