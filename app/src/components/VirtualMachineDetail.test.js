import React from 'react';
import ReactDOM from 'react-dom';
import VirtualMachineDetail from './VirtualMachineDetail';

it('VirtualMachineDetail renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VirtualMachineDetail  />, div);
});
