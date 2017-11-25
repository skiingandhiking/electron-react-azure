import * as types from '../constants/azureApiActionTypes';

const initialState = {
    gettingVirtualMachines: false,
    virtualMachines: [],
    getVirtualMachinesError: false
};

/**
 * Method to reduce virtual machines state.
 * @param state
 * @param action
 * @returns {*}
 */
export default function virtualMachinesReducer(state = initialState, action) {
    switch(action.type) {
        case types.GET_VIRTUAL_MACHINES_BEGIN:
            return {
                ...state,
                gettingVirtualMachines: true
            };
        case types.GET_VIRTUAL_MACHINES_SUCCESS:
            return {
                ...state,
                gettingVirtualMachines: false,
                virtualMachines: action.virtualMachines.value,
                getVirtualMachinesError: false
            };
        case types.GET_VIRTUAL_MACHINES_FAILURE:
            return {
                ...state,
                gettingVirtualMachines: false,
                virtualMachines: [],
                getVirtualMachinesError: true,
                getVirtualMachinesErrorMessage: action.message
            };
        default:
            return state;
    }
}
