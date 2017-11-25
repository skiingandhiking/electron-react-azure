import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class SubscriptionsDropdown extends React.Component {

    onDropdownSelect = (subscription) => {
        this.props.setSubscription(subscription);
    };

    getDropdownTitle = (subscription) => {
        return subscription ? subscription.displayName : ""
    };

    render() {
        return(
            <DropdownButton id="subscriptionsDropDown"
                            title={this.getDropdownTitle(this.props.subscription)}
                            onSelect={this.onDropdownSelect}
                            className="subscription-dropdown"
                            bsSize="small" >
                            { this.props.subscriptions.map((s) => {
                                if (s.subscriptionId !== "") {
                                    return <MenuItem key={s.subscriptionId} eventKey={s}>{s.displayName}</MenuItem>;
                                } else {
                                    return null;
                                }
                            })}
            </DropdownButton>
        );
    }
}
