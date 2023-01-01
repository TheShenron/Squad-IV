import * as types from './actionType'


export const loginRequest = ()=>{
    return {
        type: types.LOGIN_REQUEST
    }
}

export const loginSuccess = (payload)=>{
    return {
        type: types.LOGIN_SUCCESS,
        payload
    }
}

export const loginFailure = ()=>{
    return {
        type: types.LOGIN_FAILURE
    }
}


export const setChats = (payload)=>{
    return {
        type: types.CHAT,
        payload
    }
}

export const chatIndex = (payload) =>{
    return {
        type: types.INDEX,
        payload
    }
}

export const setMassages = (payload) =>{
    return {
        type: types.MASSAGES,
        payload
    }
}

export const setNotification = (payload) =>{
    return {
        type: types.NOTIFICATION,
        payload
    }
}