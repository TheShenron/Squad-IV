import { legacy_createStore , applyMiddleware , combineReducers } from 'redux'

import thunk from 'redux-thunk'

import { reducer as AuthReducer } from './authReducer/reducer'

const rootReducer = combineReducers({AuthReducer})

const store = legacy_createStore( rootReducer , applyMiddleware(thunk))

export default store