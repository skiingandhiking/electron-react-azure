import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as subscriptionActions from './subscriptionActions';
import * as types from '../constants/azureApiActionTypes';
import * as API from '../api/azureApi';
import * as utilities from '../lib/utilities';

describe('subscriptionActions tests', () => {

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    it('dispatch getSubscriptions generates GET_SUBSCRIPTIONS_BEGIN and GET_SUBSCRIPTIONS_SUCCESS when api is successful', () => {

        jest.spyOn(API, 'getSubscriptions').mockImplementation(() => {
            return new Promise((resolve) => {
                resolve("subscriptions");
            });
        });

        const expectedActions = [
            { type: types.GET_SUBSCRIPTIONS_BEGIN },
            { type: types.GET_SUBSCRIPTIONS_SUCCESS, "subscriptions": "subscriptions", "type": "GET_SUBSCRIPTIONS_SUCCESS" }
        ];
        const store = mockStore({ subscriptions: [] });

        return store.dispatch(subscriptionActions.getSubscriptions()).then(() => {
            expect(API.getSubscriptions).toHaveBeenCalled();
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('dispatch getSubscriptions generates GET_SUBSCRIPTIONS_BEGIN and GET_SUBSCRIPTIONS_ERROR when api fails', () => {

        const mockError = new Error("It didn't work");

        jest.spyOn(API, 'getSubscriptions').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                reject(mockError);
            });
        });

        jest.spyOn(utilities, 'actionErrorHandler').mockImplementation(() => {
            return mockError;
        });

        const expectedActions = [
            { type: types.GET_SUBSCRIPTIONS_BEGIN },
            { type: types.GET_SUBSCRIPTIONS_FAILURE, "message": mockError, "type": "GET_SUBSCRIPTIONS_FAILURE" }
        ];

        const store = mockStore({ token: [] });

        return store.dispatch(subscriptionActions.getSubscriptions()).then(() => {
            expect(API.getSubscriptions).toHaveBeenCalled();
            expect(store.getActions()).toEqual(expectedActions)
        })
    });
});
