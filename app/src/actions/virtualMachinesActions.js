import * as API from '../api/azureApi';
import * as types from '../constants/azureApiActionTypes';
import { actionErrorHandler } from '../lib/utilities';

/**
 * Action to get virtual machines.
 * @param subscriptionId
 * @param resourceGroupId
 * @returns {Promise<*>}
 */
export function getVirtualMachines(subscriptionId, resourceGroupId) {
    return dispatch => {
        dispatch(getVirtualMachinesBegin());
        return API.getVirtualMachines(subscriptionId, resourceGroupId)
            .then(res => {dispatch(getVirtualMachinesSuccess(res));})
            .catch(res => dispatch(getVirtualMachinesFailure(res)));
    };
}

/**
 * Begin retrieving virtual machines.
 * @returns {{type}}
 */
export function getVirtualMachinesBegin() {
    return {
        type: types.GET_VIRTUAL_MACHINES_BEGIN
    };
}

/**
 * Successfully retrieved virtual machines.
 * @param virtualMachines
 * @returns {{type, virtualMachines: *}} virtualMachines
 */
export function getVirtualMachinesSuccess(virtualMachines) {
    return {
        type: types.GET_VIRTUAL_MACHINES_SUCCESS,
        virtualMachines
    };
}

/**
 * Failed to get virtual machines.
 * @param res
 * @returns {{type, message: string}} response error message
 */
export function getVirtualMachinesFailure(res) {
    let error = actionErrorHandler(res);
    return {
        type: types.GET_SUBSCRIPTIONS_FAILURE,
        message: error
    };
}
