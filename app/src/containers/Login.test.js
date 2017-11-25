import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { Provider } from 'react-redux';

it('Login renders without crashing', () => {
    const div = document.createElement('div');

    let mockState = {
        login: {
            loginError : null,
            loginErrorMessage: null
        }
    };

    let mockStore = {
        getState: () => mockState,
        dispatch: () => {},
        subscribe: () => {}
    };

    ReactDOM.render(
        <Provider store={mockStore}>
            <Login />
        </Provider>, div);
});

