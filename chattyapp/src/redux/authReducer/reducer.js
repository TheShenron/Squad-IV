
import * as types from './actionType'

const initialState = {
    isAuth: false,
    user: false,
    chats: [],
    currentChatInd: -1,
    massages: [],
    notification: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuth: true
            }

        case types.LOGIN_FAILURE:
            return {
                ...state,
                isAuth: false
            }

        case types.CHAT:
            return {
                ...state,
                chats: action.payload
            }

        case types.INDEX:
            return {
                ...state,
                currentChatInd: action.payload
            }

        case types.MASSAGES:
            return {
                ...state,
                massages: action.payload
            }

        case types.NOTIFICATION:
            return {
                ...state,
                notification: action.payload
            }

        default:
            return state


    }
}