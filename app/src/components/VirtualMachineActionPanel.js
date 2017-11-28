import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { getResourceGroupNameFromId } from "../lib/utilities";
import * as azureApi from '../api/azureApi';

export default class ManageVirtualMachinePanel extends React.Component {

    getVirtualMachineActionParams = () => {
        return [
            this.props.subscriptionId,
            getResourceGroupNameFromId(this.props.virtualMachine.id),
            this.props.virtualMachine.name
        ];
    };

    startVirtualMachine = () => {
        azureApi.startVirtualMachine(...this.getVirtualMachineActionParams()).then(() => {},
            (reason) => {
            console.log("Failed to start virtual machine: " + reason);
        });

        this.props.onHide();
    };

    stopVirtualMachine = () => {
        azureApi.stopVirtualMachine(...this.getVirtualMachineActionParams()).then(() => {},
            (reason) => {
            console.log("Failed to stop virtual machine: " + reason);
        });

        this.props.onHide();
    };

    deallocateVirtualMachine = () => {
        azureApi.deallocateVirtualMachine(...this.getVirtualMachineActionParams()).then(() => {},
            (reason) => {
            console.log("Failed to deallocate virtual machine: " + reason);
        });

        this.props.onHide();
    };

    isVirtualMachineOn = (powerStateCode) => {
        let powerStateCodes = {
            "PowerState/running": true,
            "PowerState/starting": true,
            "PowerState/stopping": true,
            "PowerState/stopped": false,
            "PowerState/deallocating": true,
            "PowerState/deallocated": false,
            "default": false
        };

        return (powerStateCodes[powerStateCode] || powerStateCodes["default"]);
    };

    render() {
        return(
            <div>
                <ButtonGroup>
                    <span>
                        <Button
                            disabled={this.isVirtualMachineOn(this.props.powerStateCode)}
                            onClick={this.startVirtualMachine}>
                            Start
                        </Button>
                    </span>
                    <span>
                        <Button
                            disabled={!this.isVirtualMachineOn(this.props.powerStateCode)}
                            onClick={this.deallocateVirtualMachine}>
                            Stop and deallocate
                        </Button>
                    </span>
                    <span>
                        <Button
                            disabled={!this.isVirtualMachineOn(this.props.powerStateCode)}
                            onClick={this.stopVirtualMachine}>
                            Stop
                        </Button>
                    </span>
                </ButtonGroup>
            </div>
        );
    }
}
