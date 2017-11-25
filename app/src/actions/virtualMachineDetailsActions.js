import * as API from '../api/azureApi';
import * as types from '../constants/azureApiActionTypes';

/**
 * Action to get virtual machine detail.
 * @param subscriptionId
 * @param resourceGroupName
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
    let error = "Unable to connect to the Microsoft Azure API";

    if ((res.response) && (res.response.data) && (res.response.data.error)) {
        error = res.response.data.error.message;
    }

    return {
        type: types.GET_VIRTUAL_MACHINE_DETAIL_FAILURE,
        message: error
    };
}
