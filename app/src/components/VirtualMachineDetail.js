import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class VirtualMachineDetail extends React.Component {

    getLatestPowerState = () => {
        if (this.props.vmDetail && this.props.vmDetail.statuses) {
            let details = this.props.vmDetail;
            return details.statuses[details.statuses.length - 1].displayStatus;
        }
    };

    getOperatingSystem = (vmProperties) => {
        if (vmProperties.storageProfile && vmProperties.storageProfile.osDisk) {
            return vmProperties.storageProfile.osDisk.osType;
        }
    };

    render() {
        return(
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        {this.props.vmBasic &&
                            <Modal.Title id="contained-modal-title-lg">
                                Details for {this.props.vmBasic.name}
                            </Modal.Title>
                        }
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.vmBasic &&
                            <div>
                                <p>Name: {this.props.vmBasic.name}</p>
                                <p>Location: {this.props.vmBasic.location}</p>

                                {this.props.vmBasic.properties &&
                                    <div>
                                        <p>Provisioning State: {this.props.vmBasic.properties.provisioningState}</p>
                                        <p>Operating System Type: {this.getOperatingSystem(this.props.vmBasic.properties)}</p>
                                    </div>
                                }
                            </div>
                        }
                        {this.props.vmDetail &&
                            <div>
                                <p>Latest Status: {this.getLatestPowerState()}</p>
                            </div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
