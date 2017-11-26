import React from 'react';
import ReactDOM from 'react-dom';
import VirtualMachinesList from './VirtualMachinesList';

it('VirtualMachinesList renders without crashing', () => {
    let mockVirtualMachines = [
        {
            "properties": {
                "vmId": "1"
            },
            "location": "eastus",
            "id": "/subscriptions/00000000-0000-0000-0000-000000000001/resourceGroups/RESOURCEGROUP1/providers/Microsoft.Compute/virtualMachines/test1",
            "name": "test1"
        },
        {
            "properties": {
                "vmId": "2"
            },
            "location": "westus",
            "id": "/subscriptions/00000000-0000-0000-0000-000000000002/resourceGroups/RESOURCEGROUP2/providers/Microsoft.Compute/virtualMachines/test2",
            "name": "test2"
        }
    ];

    const div = document.createElement('div');
    ReactDOM.render(<VirtualMachinesList virtualMachines={mockVirtualMachines} />, div);
});
