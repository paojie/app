import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index.js'
import thunkMiddleware from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



export default function configStore(initialState) {
    
    const store = createStore(rootReducer, initialState,composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )   
        // 触发 redux-devtools
        
        
    )
    return store
}