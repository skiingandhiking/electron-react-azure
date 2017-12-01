import axios from 'axios';


export function getResourceGroupNameFromId(virtualMachineId) {
    let idArray = virtualMachineId.split("/");
    return(idArray[4]);
}

export function actionErrorHandler(error) {
    let errorMessage = "Unable to connect to the Microsoft Azure API";
    if (error && error.response) {
        if (error.response.data.error &&
            (error.response.data.error.code  === "ExpiredAuthenticationToken")){
            axios.defaults.headers.common['Authorization'] = null;
            window.location = '/login';
        }
        errorMessage = error.message;
    }
    return errorMessage;
}