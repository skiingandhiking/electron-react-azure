import React from 'react';
import { Button, Table } from 'react-bootstrap';

export default class VirtualMachinesList extends React.Component {

    render() {
        return(
            <Table responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>VmId</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                { this.props.virtualMachines.map((v) => {
                    return <tr key={v.id}>
                        <td>
                            <Button
                                onClick={() => this.props.onShowVirtualMachineDetails(v)}
                                bsStyle="link"
                                bsSize="small">
                                {v.name}
                            </Button>
                        </td>
                        <td>{v.properties.vmId}</td>
                        <td>{v.location}</td>
                    </tr>
                })}
                </tbody>
            </Table>
        );
    }
}
