import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './rootReducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store
if(process.env.NODE_ENV === 'production') {
  store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));
} else {
  store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, logger)
  ));
}

export default store