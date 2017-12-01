import React from 'react';
import { Modal } from 'react-bootstrap';
import VirtualMachineActionPanel from './VirtualMachineActionPanel';

export default class VirtualMachineDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vm: null,
            vmDetail: null
        };
    };

    componentWillReceiveProps(next){
        if (next.vm) {
            this.setState({ vm: next.vm});
        }

        if (next.vmDetail) {
            this.setState({ vmDetail: next.vmDetail });
        }
    };

    getLatestPowerStateDisplay = (detail) => {
        if (detail && detail.statuses) {
            return detail.statuses[detail.statuses.length - 1].displayStatus;
        }
    };

    getLatestPowerStateCode = (detail) => {
        if (detail && detail.statuses) {
            return detail.statuses[detail.statuses.length - 1].code;
        }
    };

    getOperatingSystemType = (vm) => {
        if (vm && vm.properties.storageProfile) {
            return vm.properties.storageProfile.osDisk.osType;
        }
    };

    render() {
        let vm = this.state.vm,
            vmDetail = this.state.vmDetail,
            vmPowerState = this.getLatestPowerStateDisplay(vmDetail),
            vmPowerStateCode = this.getLatestPowerStateCode(vmDetail),
            vmOsType = this.getOperatingSystemType(vm);

        return(
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        {vm &&
                            <Modal.Title id="contained-modal-title-lg">Details for {vm.name}</Modal.Title>
                        }
                    </Modal.Header>
                    <Modal.Body>
                        {vm &&
                            <div>
                                <p>Name: {vm.name}</p>
                                <p>Location: {vm.location}</p>
                                {vm.properties &&
                                    <div>
                                        <p>Provisioning State: {vm.properties.provisioningState}</p>
                                        <p>Operating System Type: {vmOsType}</p>
                                    </div>
                                }
                            </div>
                        }
                        {vmDetail &&
                            <div>
                                <p>Latest Status: {vmPowerState}</p>
                                <VirtualMachineActionPanel
                                    subscriptionId={this.props.subscriptionId}
                                    virtualMachine={vm}
                                    powerStateCode={vmPowerStateCode}
                                    onHide={this.props.onHide}
                                />
                            </div>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
