import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { login } from '../actions/loginActions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tenantId: '',
            clientId: '',
            clientSecret: ''
        };
    }

    /**
     * Method to perform Azure login action upon request of user.
     * @param e
     */
    onLogin = (e) => {
        e.preventDefault();
        this.props.dispatch(login(this.state.tenantId, this.state.clientId, this.state.clientSecret));
    };

    /**
     * Method to manage form input changes.
     * @param e
     */
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render(){
        let { tenantId, clientId, clientSecret } = this.state;
        return (
            <div>
                <form id="loginForm" name="loginForm" className="login-form">
                    <ControlLabel><strong>Directory ID</strong></ControlLabel>
                    <div className="login-error">{this.props.loginError ? this.props.loginErrorMessage: ""}</div>
                    <FormGroup controlId="azureDirectoryId">
                        <FormControl
                            type="text"
                            value={tenantId}
                            name="tenantId"
                            className="input-field"
                            onChange={ this.onChange }/>
                        <FormControl.Feedback />
                    </FormGroup>
                    <ControlLabel><strong>Application ID</strong></ControlLabel>
                    <FormGroup controlId="azureApplicationID">
                        <FormControl
                            type="text"
                            value={clientId}
                            name="clientId"
                            className="input-field"
                            onChange={ this.onChange }/>
                        <FormControl.Feedback />
                    </FormGroup>
                    <ControlLabel><strong>Client Key Value</strong></ControlLabel>
                    <FormGroup controlId="azureClientKey">
                        <FormControl
                            type="text"
                            value={clientSecret}
                            name="clientSecret"
                            className="input-field"
                            onChange={ this.onChange }/>
                        <FormControl.Feedback />
                    </FormGroup>
                    <Button
                        id="loginBtn"
                        type="submit"
                        className="submit-button"
                        onClick={ this.onLogin }>
                        Sign On
                    </Button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginError: state.login.loginError,
        loginErrorMessage: state.login.loginErrorMessage
    };
}

export default connect(mapStateToProps)(Login);
