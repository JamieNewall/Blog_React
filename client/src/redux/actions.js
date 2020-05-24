

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