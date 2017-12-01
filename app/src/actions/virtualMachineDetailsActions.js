import * as API from '../api/azureApi';
import * as types from '../constants/azureApiActionTypes';
import { actionErrorHandler } from '../lib/utilities';

/**
 * Action to get virtual machine detail.
 * @param subscriptionId
 * @param resourceGroupName
 * @param virtualMachineName
 * @returns {Promise<*>}
 */
export function getVirtualMachineDetail(subscriptionId, resourceGroupName, virtualMachineName) {
    return dispatch => {
        dispatch(getVirtualMachineDetailBegin());
        return API.getVirtualMachineDetail(subscriptionId, resourceGroupName, virtualMachineName)
            .then(res => {dispatch(getVirtualMachineDetailSuccess(res));})
            .catch(res => dispatch(getVirtualMachineDetailFailure(res)));
    };
}

/**
 * Begin retrieving virtual machine Detail.
 * @returns {{type}}
 */
export function getVirtualMachineDetailBegin() {
    return {
        type: types.GET_VIRTUAL_MACHINE_DETAIL_BEGIN
    };
}

/**
 * Successfully retrieved virtual machine detail.
 * @param details
 * @returns {{type, virtualMachineDetail: *}} virtualMachineDetail
 */
export function getVirtualMachineDetailSuccess(details) {
    return {
        type: types.GET_VIRTUAL_MACHINE_DETAIL_SUCCESS,
        details
    };
}

/**
 * Failed to get virtual machine detail.
 * @param res
 * @returns {{type, message: string}} response error message
 */
export function getVirtualMachineDetailFailure(res) {
    let error = actionErrorHandler(res);
    return {
        type: types.GET_SUBSCRIPTIONS_FAILURE,
        message: error
    };
}
