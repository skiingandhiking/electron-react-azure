import React from 'react';
import { connect } from 'react-redux';
import SubscriptionsDropdown from '../components/SubscriptionsDropdown';
import VirtualMachinesList from '../components/VirtualMachinesList';
import VirtualMachineDetail from '../components/VirtualMachineDetail';
import { getSubscriptions } from '../actions/subscriptionActions';
import { getVirtualMachines} from '../actions/virtualMachinesActions';
import { getVirtualMachineDetail } from '../actions/virtualMachineDetailsActions';
import { getResourceGroupNameFromId } from "../lib/utilities";
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

    componentWillMount() {
        this.props.dispatch(getSubscriptions());
    };

    componentDidUpdate(){
        if (this.state.subscription === null && this.props.subscriptions !== null) {
            let subscription = this.props.subscriptions[0];
            this.setSubscription(subscription);
        }
    };

    setSubscription = (subscription) => {
        this.setState({subscription: subscription, resourceGroup: null});
        this.props.dispatch(getVirtualMachines(subscription.subscriptionId));
    };

    openVirtualMachineDetails = (virtualMachine) => {
        let subscriptionId = this.state.subscription.subscriptionId,
            resourceName = getResourceGroupNameFromId(virtualMachine.id),
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
                        onHide={this.closeVirtualMachineDetails}
                        show={this.state.showVirtualMachineDetails}
                        subscriptionId={this.state.subscription ? this.state.subscription.subscriptionId : null}
                        vm={this.state.virtualMachine}
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

