import React from 'react';
import ReactDOM from 'react-dom';
import VirtualMachineActionPanel from './VirtualMachineActionPanel';

it('VirtualMachineActionPanel renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VirtualMachineActionPanel  />, div);
});
