import { combineReducers } from 'redux';
import { default as loginReducer } from './loginReducer';
import subscriptions from './subscriptionsReducer';
import virtualMachineDetail from './virtualMachineDetailReducer'
import virtualMachines from './virtualMachinesReducer';


// Reducers
const rootReducer = combineReducers({
    login: loginReducer,
    subscriptions,
    virtualMachineDetail,
    virtualMachines
});

export default rootReducer;
