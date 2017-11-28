import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import VirtualMachines from './VirtualMachines';

it('VirtualMachines renders without crashing', () => {
    let mockStore = {
        dispatch: () => {},
        subscribe: () => {},
        getState: () => {}
    };

    shallow(<Provider store={mockStore}>
        <VirtualMachines />
        </Provider>
    );
});

