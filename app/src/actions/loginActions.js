import * as API from '../api/azureApi';
import * as types from '../constants/azureApiActionTypes';
import { actionErrorHandler } from '../lib/utilities';

/**
 * Method to authenticate a user against the Azure API.
 * @param tenantId
 * @param clientId
 * @param clientSecret
 * @returns {function(*)}
 */
export function login(tenantId, clientId, clientSecret) {
    return dispatch => {
        dispatch(loginBegin());
        return API.login(tenantId, clientId, clientSecret)
            .then(res => {dispatch(loginSuccess(res));})
            .catch(res => dispatch(loginFailure(res)));
    };
}

/**
 * Signifies beginning to authenticate.
 * @returns {{type}}
 */
export function loginBegin() {
    return {
        type: types.LOGIN_BEGIN
    };
}

/**
 * Signifies success to authenticate.
 * @param token
 * @returns {{type, token: *}} user object and tokens
 */
export function loginSuccess(token) {
    return {
        type: types.LOGIN_SUCCESS,
        token
    };
}

/**
 * Signifies failure to authenticate.
 * @param res
 * @returns {{type, message: string}} response error message
 */
export function loginFailure(res) {
    let error = actionErrorHandler(res);
    return {
        type: types.LOGIN_FAILURE,
        message: error
    };
}
