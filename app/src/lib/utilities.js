


export function getResourceGroupNameFromId (virtualMachineId) {
    let idArray = virtualMachineId.split("/");
    return(idArray[4]);
}
