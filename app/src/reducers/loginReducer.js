import * as types from '../constants/azureApiActionTypes';

const initialState = {
    isLoggingIn: false,
    token: null,
    loginError: false
};

/**
 * Method to reduce login state.
 * @param state
 * @param action
 * @returns {*}
 */
export default function loginReducer(state = initialState, action) {
    switch(action.type) {
        case types.LOGIN_BEGIN:
            return {
                ...state,
                isLoggingIn: true
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                token: action.token,
                loginError: false
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                token: null,
                loginError: true,
                loginErrorMessage: action.message
            };
        default:
            return state;
    }
}
