import * as types from '../constants/azureApiActionTypes';

const initialState = {
    gettingSubscriptions: false,
    subscriptions: [],
    getSubscriptionsError: false
};

/**
 * Method to reduce subscriptions state.
 * @param state
 * @param action
 * @returns {*}
 */
export default function subscriptionsReducer(state = initialState, action) {
    switch(action.type) {
        case types.GET_SUBSCRIPTIONS_BEGIN:
            return {
                ...state,
                gettingSubscriptions: true
            };
        case types.GET_SUBSCRIPTIONS_SUCCESS:
            return {
                ...state,
                gettingSubscriptions: false,
                subscriptions: action.subscriptions.value,
                getSubscriptionsError: false
            };
        case types.GET_SUBSCRIPTIONS_FAILURE:
            return {
                ...state,
                gettingSubscriptions: false,
                subscriptions: [],
                getSubscriptionsError: true,
                getSubscriptionsErrorMessage: action.message
            };
        default:
            return state;
    }
}
