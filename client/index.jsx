import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {Router,Route,browserHistory} from 'react-router';
import configStore from './configStore'
import './static/css/reset.css'
import Routemap from './routes'



const store = configStore()

    



ReactDOM.render(
    <Provider store={store}>
        <Routemap />
    </Provider>,
    document.getElementById('root'));