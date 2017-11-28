import axios from 'axios';

/**
 * Rsponse interceptor  to ensure the bearer token is
 * specified for future requests
 */
axios.interceptors.response.use(function (response) {
    if(response && response.data && response.data.access_token) {
        let authToken = "Bearer " + response.data.access_token;
        axios.defaults.headers.common['Authorization'] = authToken;
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

/**
 * Deallocate a virtual machine
 * @param subscriptionId
 * @param resourceGroupName
 * @param virtualMachineName
 * @returns {Promise<*>}
 */
export function deallocateVirtualMachine(subscriptionId, resourceGroupName, virtualMachineName) {
    let apiVersion = '2016-04-30-preview';
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${virtualMachineName}/deallocate?api-version=${apiVersion}`;
    return axios.post(url).then(res=>res.data);
}

/**
 * Method to authenticate against the Azure restful API.
 * @param tenantId
 * @param clientId
 * @param clientSecret
 * @returns {Promise<*>}
 */
export function login(tenantId, clientId, clientSecret) {
    const url = `https://login.microsoftonline.com/${tenantId}/oauth2/token`;
    let formData = new FormData();
    formData.append('tenant_id', tenantId);
    formData.append('grant_type','client_credentials');
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);
    formData.append('resource', 'https://management.azure.com/');
    return axios.post(url, formData).then(res=>res.data);
}

/**
 * Method to get subscriptions from the Azure restful API
 * @returns {Promise<*>}
 */
export function getSubscriptions() {
    let apiVersion = '2015-01-01';
    const url = `https://management.azure.com/subscriptions?api-version=${apiVersion}`;
    return axios.get(url).then(res=>res.data);
}

/**
 * Get virtual machine detail
 * @param subscriptionId
 * @param resourceGroupName
 * @param virtualMachineName
 * @returns {Promise<*>}
 */
export function getVirtualMachineDetail(subscriptionId, resourceGroupName, virtualMachineName) {
    let apiVersion = '2016-04-30-preview';
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${virtualMachineName}/InstanceView?api-version=${apiVersion}`;
    return axios.get(url).then(res=>res.data);
}

/**
 * Get virtual machines in a resource group from the Azure restful API
 * @param subscriptionId
 * @returns {Promise<*>}
 */
export function getVirtualMachines(subscriptionId) {
    let apiVersion = '2016-04-30-preview';
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Compute/virtualmachines?api-version=${apiVersion}`;
    return axios.get(url).then(res=>res.data);
}

/**
 * Start a virtual machine
 * @param subscriptionId
 * @param resourceGroupName
 * @param virtualMachineName
 * @returns {Promise<*>}
 */
export function startVirtualMachine(subscriptionId, resourceGroupName, virtualMachineName) {
    let apiVersion = '2016-04-30-preview';
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${virtualMachineName}/start?api-version=${apiVersion}`;
    return axios.post(url).then(res=>res.data);
}

/**
 * Stop a virtual machine
 * @param subscriptionId
 * @param resourceGroupName
 * @param virtualMachineName
 * @returns {Promise<*>}
 */
export function stopVirtualMachine(subscriptionId, resourceGroupName, virtualMachineName) {
    let apiVersion = '2016-04-30-preview';
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${virtualMachineName}/powerOff?api-version=${apiVersion}`;
    return axios.post(url).then(res=>res.data);
}