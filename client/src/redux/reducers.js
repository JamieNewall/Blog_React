import {GET_IS_LOGGEDIN} from './actions'
import {ADD_POST_TO_STATE} from './actions'



const initialState = {
    isLoggedIn: false,
    loginWarning: false
}


 const rootReducer = (state = initialState, action) => {

    switch(action.type) {
        case GET_IS_LOGGEDIN:
            return {...state}
        case 'CHANGE_LOGIN_WARNING_FALSE':
            return {...state, loginWarning: false}
        case 'CHANGE_LOGIN_WARNING_TRUE':
            return {...state, loginWarning: true}
        case 'CHANGE_LOGIN_STATUS_TRUE':
            return {...state, isLoggedIn: true}
        case 'ADD_TITLE_TO_STATE':
            return {...state, titleText: action.payload}
        case 'ADD_TAG_INPUT_TO_STATE':
            return {...state, tagInputValue: action.payload}
        case 'ADD_TAGS_TO_STATE':
             return {...state, tagsArray: [...state.tagsArray, action.payload]}
        case 'RESET_TAGS_STATE':
            return {...state, tagsArray:[]}
        case 'GET_POST_FROM_LOCAL_STATE':
             return {...state}
        case 'RESET_POST_STATE':
            return {...state, titleText: '', postText: '', tagsArray: []}
        case 'SET_POSTS':
            return {...state, allPosts: [...state.allPosts, ...action.payload]}
        case 'SET_USER_ID_IN_STATE':
            return {...state, userId: action.payload}
        case 'SET_SEARCH_STATE':
            return {...state, searchInputState: action.payload}
        case 'ADD_TAG_INPUT_SELECTED_TO_STATE':
            return {...state, tagInputValueSelected: action.payload}
        case 'SET_SEARCH_REGEX':
            return {...state, searchRegex: action.payload}
        case 'REMOVE_TAG_FROM_TAG_ARRAY':
            return {...state, tagsArray: state.tagsArray.filter(item => item !== action.payload)}
        case 'SUBMIT_SUCCESSFUL':
            return {...state, submitSuccessful: true}
        case 'RESET_SUBMIT':
            return {...state, submitSuccessful: false}
        case 'ADD_POST_TO_STATE':
            return {...state, currentPostWordCount: action.payload.length, postText: action.payload }
        case 'SET_POST_TO_READ':
            return {...state, postToRead: action.payload}
        case 'LOGOUT':
                return {...state, isLoggedIn: false, userId:''}
        default:
            return {...state}
    }
}

export default rootReducer;
