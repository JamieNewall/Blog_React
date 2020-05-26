import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk]

const initState = {allPosts: [], isLoggedIn: true, loginWarning: false, postText: '',
    currentPostWordCount: 0, titleText: '', tagsArray: [], tagInputValue:'',tagInputValueSelected:'',
submitSuccessful: false, searchInputState:'',searchRegex:'' }

const store = createStore(
    rootReducer, initState,
    composeWithDevTools(applyMiddleware(...middleware))


)

export default store