import React from 'react';
import { connect } from 'react-redux';
import SubscriptionsDropdown from '../components/SubscriptionsDropdown';
import VirtualMachinesList from '../components/VirtualMachinesList';
import VirtualMachineDetail from '../components/VirtualMachineDetail';
import { getSubscriptions } from '../actions/subscriptionActions';
import { getVirtualMachines} from '../actions/virtualMachineActions';
import { getVirtualMachineDetail } from '../actions/virtualMachineDetailsActions';

import './VirtualMachines.css';

class VirtualMachines extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscription: null,
            virtualMachine: null,
            showVirtualMachineDetails: false
        };
    }
    // Get subscriptions
    componentWillMount() {
        this.props.dispatch(getSubscriptions());
    };

    // Set the defaults
    componentDidUpdate(){
        if (this.state.subscription === null && this.props.subscriptions !== null) {
            let subscription = this.props.subscriptions[0];
            this.setSubscription(subscription);
        }
    };

    // Set the current selected subscription
    setSubscription = (subscription) => {
        this.setState({subscription: subscription, resourceGroup: null});
        this.props.dispatch(getVirtualMachines(subscription.subscriptionId));
    };

    openVirtualMachineDetails = (virtualMachine) => {
        let subscriptionId = this.state.subscription.subscriptionId,
            idArray = virtualMachine.id.split("/"),
            resourceName = idArray[4],
            virtualMachineName = virtualMachine.name;

        this.setState({showVirtualMachineDetails: true, virtualMachine: virtualMachine});
        this.props.dispatch(getVirtualMachineDetail(subscriptionId, resourceName, virtualMachineName ));
    };

    closeVirtualMachineDetails = () => {
        this.setState({showVirtualMachineDetails: false});
    };

    render() {
        return (
            <div>
                <div className="resources-div-table">
                    <div className="resources-div-table-row">
                        <div className="resources-div-table-cell">Subscriptions</div>
                    </div>
                    <div className="resources-div-table-row">
                        <div className="resources-div-table-cell">
                            <SubscriptionsDropdown
                                subscription={this.state.subscription}
                                subscriptions={this.props.subscriptions}
                                setSubscription={this.setSubscription}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <VirtualMachinesList
                        virtualMachines={this.props.virtualMachines}
                        onShowVirtualMachineDetails={this.openVirtualMachineDetails}
                    />
                </div>
                    <VirtualMachineDetail
                        show={this.state.showVirtualMachineDetails}
                        onHide={this.closeVirtualMachineDetails}
                        vmBasic={this.state.virtualMachine}
                        vmDetail={this.props.virtualMachineDetail}
                    />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        subscriptions: state.subscriptions.subscriptions,
        virtualMachineDetail: state.virtualMachineDetail.virtualMachineDetail,
        virtualMachines: state.virtualMachines.virtualMachines
    };
}

export default connect(mapStateToProps)(VirtualMachines);

