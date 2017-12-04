import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as loginActions from './loginActions';
import * as types from '../constants/azureApiActionTypes';
import * as API from '../api/azureApi';
import * as utilities from '../lib/utilities';

describe('loginActions tests', () => {

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    it('dispatch login generates LOGIN_BEGIN and LOGIN_SUCCESS when api is successful', () => {

        jest.spyOn(API, 'login').mockImplementation(() => {
            return new Promise((resolve) => {
                resolve("mocktoken");
            });
        });

        const expectedActions = [
            { type: types.LOGIN_BEGIN },
            { type: types.LOGIN_SUCCESS, "token": "mocktoken", "type": "LOGIN_SUCCESS" }
        ];
        const store = mockStore({ token: [] });

        return store.dispatch(loginActions.login('gfg','hgh', 'fdgff')).then(() => {
            expect(API.login).toHaveBeenCalled();
            expect(store.getActions()).toEqual(expectedActions)
        })
    });


    it('dispatch login generates LOGIN_BEGIN and LOGIN_FAILUE when api fails', () => {

        const mockError = new Error("It didn't work");

        jest.spyOn(API, 'login').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                reject(mockError);
            });
        });

        jest.spyOn(utilities, 'actionErrorHandler').mockImplementation(() => {
            return mockError;
        });

        const expectedActions = [
            { type: types.LOGIN_BEGIN },
            { type: types.LOGIN_FAILURE, "message": mockError, "type": "LOGIN_FAILURE" }
        ];

        const store = mockStore({ token: [] });

        return store.dispatch(loginActions.login('gfg','hgh', 'fdgff')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(API.login).toHaveBeenCalled();
            expect(utilities.actionErrorHandler).toHaveBeenCalled();
        })
    });
});
