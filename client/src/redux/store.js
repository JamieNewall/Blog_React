import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk]

const initState = {isLoggedIn: false, loginWarning: false}

const store = createStore(
    rootReducer, initState,
    composeWithDevTools(applyMiddleware(...middleware))


)

export default store