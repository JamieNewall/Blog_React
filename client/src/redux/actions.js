

export const GET_IS_LOGGEDIN = {type: 'GET_IS_LOGGEDIN'}


//Post Actions
export const ADD_POST_TO_STATE = function (payload) {
    return {type: 'ADD_POST_TO_STATE', payload}
}

export const ADD_TITLE_TO_STATE = function (payload) {
    return {type: 'ADD_TITLE_TO_STATE', payload}
}

export const ADD_TAGS_TO_STATE = function (payload) {

    return {type: 'ADD_TAGS_TO_STATE', payload}
}

export const ADD_TAG_INPUT_TO_STATE = function (payload) {
    return {type: 'ADD_TAG_INPUT_TO_STATE', payload}
}

export const ADD_TAG_INPUT_SELECTED_TO_STATE = function (payload) {
    return {type: 'ADD_TAG_INPUT_SELECTED_TO_STATE', payload}
}

export const REMOVE_TAG_FROM_TAG_ARRAY = function(payload) {
    return {type: 'REMOVE_TAG_FROM_TAG_ARRAY', payload}
}

export const GET_POST_FROM_LOCAL_STATE = function(){
    return {type:'GET_POST_FROM_LOCAL_STATE'}
}

export const SUBMIT_SUCCESSFUL = function() {
    return {type: 'SUBMIT_SUCCESSFUL'}
}

export const SET_POSTS = function(payload) {
    return {type: 'SET_POSTS', payload}
}

export const SET_SEARCH_STATE = function(payload) {
    return {type:'SET_SEARCH_STATE', payload }
}

export const SET_SEARCH_REGEX = function(payload) {
    return {type:'SET_SEARCH_REGEX', payload}
}

export const SET_USER_ID_IN_STATE = function(payload) {
    return {type: 'SET_USER_ID_IN_STATE' , payload}
}

export const SET_POST_TO_READ = function(payload) {
    return {type: 'SET_POST_TO_READ', payload}
}