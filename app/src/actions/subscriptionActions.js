import * as API from '../api/azureApi';
import * as types from '../constants/azureApiActionTypes';

/**
 * Action to get subscriptions.
 * @returns {Promise<*>}
 */
export function getSubscriptions() {
    return dispatch => {
        dispatch(getSubscriptionsBegin());
        return API.getSubscriptions()
            .then(res => {dispatch(getSubscriptionsSuccess(res));})
            .catch(res => dispatch(getSubscriptionsFailure(res)));
    };
}

/**
 * Begin retrieving subscriptions.
 * @returns {{type}}
 */
export function getSubscriptionsBegin() {
    return {
        type: types.GET_SUBSCRIPTIONS_BEGIN
    };
}

/**
 * Successfully retrieved subscriptions.
 * @param usage
 * @returns {{type, usage: *}} usage
 */
export function getSubscriptionsSuccess(subscriptions) {
    return {
        type: types.GET_SUBSCRIPTIONS_SUCCESS,
        subscriptions
    };
}

/**
 * Failed to get subscriptions.
 * @param res
 * @returns {{type, message: string}} response error message
 */
export function getSubscriptionsFailure(res) {
    let error = "Unable to connect to the Microsoft Azure API";

    if ((res.response) && (res.response.data) && (res.response.data.error)) {
        error = res.response.data.error.message;
    }

    return {
        type: types.GET_SUBSCRIPTIONS_FAILURE,
        message: error
    };
}
