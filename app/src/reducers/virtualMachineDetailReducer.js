import * as types from '../constants/azureApiActionTypes';

const initialState = {
    gettingVirtualMachineDetail: false,
    virtualMachineDetail: [],
    getVirtualMachineDetailError: false
};

/**
 * Method to reduce virtual machine details.
 * @param state
 * @param action
 * @returns {*}
 */
export default function virtualMachineDetailReducer(state = initialState, action) {
    switch(action.type) {
        case types.GET_VIRTUAL_MACHINE_DETAIL_BEGIN:
            return {
                ...state,
                gettingVirtualMachineDetail: true
            };
        case types.GET_VIRTUAL_MACHINE_DETAIL_SUCCESS:
            return {
                ...state,
                gettingVirtualMachineDetail: false,
                virtualMachineDetail: action.details,
                getVirtualMachineDetailError: false
            };
        case types.GET_VIRTUAL_MACHINE_DETAIL_FAILURE:
            return {
                ...state,
                gettingVirtualMachineDetail: false,
                virtualMachineDetail: [],
                getVirtualMachineDetailError: true,
                getVirtualMachineDetailErrorMessage: action.message
            };
        default:
            return state;
    }
}
