import {GET_IS_LOGGEDIN} from './actions'



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
        default:
            return {...state}
    }
}

export default rootReducer;
