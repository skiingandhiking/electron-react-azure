import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';

it('App renders without crashing', () => {
    const div = document.createElement('div');

    let mockState = {
        login: {token : null}
    };

    let mockStore = {
        getState: () => mockState,
        dispatch: () => {},
        subscribe: () => {}
    };

    ReactDOM.render(
        <Provider store={mockStore}>
          <App />
        </Provider>, div);
});

