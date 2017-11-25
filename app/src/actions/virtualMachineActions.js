import * as API from '../api/azureApi';
import * as types from '../constants/azureApiActionTypes';

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
 * @param usage
 * @returns {{type, usage: *}} usage
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
    let error = "Unable to connect to the Microsoft Azure API";

    if ((res.response) && (res.response.data) && (res.response.data.error)) {
        error = res.response.data.error.message;
    }

    return {
        type: types.GET_VIRTUAL_MACHINES_FAILURE,
        message: error
    };
}
