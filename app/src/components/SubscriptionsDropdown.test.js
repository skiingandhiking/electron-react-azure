import React from 'react';
import ReactDOM from 'react-dom';
import SubscriptionDropdown from './SubscriptionsDropdown';


it('SubscriptionDropdown renders without crashing', () => {
    let mockSubscriptions = [
        {
            "subscriptionId": "1",
            "displayName": "DisplayName 1",
            "state": "Enabled"
        },
        {
            "subscriptionId": "2",
            "displayName": "DisplayName 2",
            "state": "Enabled"
        }
    ];

    const div = document.createElement('div');
    ReactDOM.render(<SubscriptionDropdown subscriptions={mockSubscriptions} />, div);
});
