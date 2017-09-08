import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    validateUser: ['email'],
    validateUserSuccess: ['email'],
    validateUserFailure: ['error'],
    getUserInfo: ['accessToken'],
    getUserInfoFailure: ['error']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    error: null,
    email: null,
})

/* ------------- Reducers ------------- */

export const request = (state, { email }) =>
    state.merge({ fetching: true, email })

export const failure = (state, action) => {
    const { error } = action;
    return state.merge({ fetching: false, error });
}

export const success = (state, action) => {
    const { user } = action;
    return state.merge({ fetching: false, user });
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.VALIDATE_USER]: request,
    [Types.VALIDATE_USER_SUCCESS]: success,
    [Types.VALIDATE_USER_FAILURE]: failure,
    [Types.GET_USER_INFO]: request,
    [Types.GET_USER_INFO_FAILURE]: failure
})
