import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Switch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import LoginRoute from '../components/LoginRoute';
import Login from '../components/Login';
import VirtualMachines from './VirtualMachines';

import 'bootstrap/dist/css/bootstrap.css';

/**
 * @class App
 * This is the app shell.
 */
class App extends Component {

    render() {
        return (
            <HashRouter>
                <div className="App">
                    <Switch>
                        <LoginRoute exact authenticated={ this.authenticated() } path="/login" component={ Login }/>
                        <PrivateRoute
                            exact
                            authenticated={ this.authenticated() }
                            path="/"
                            component={ VirtualMachines }
                        />
                    </Switch>
                </div>
            </HashRouter>
        );
    }

    authenticated() {
        return !!this.props.token;
    }
}

const mapStateToProps = state => ({
    token: state.login.token
});

export default connect(mapStateToProps)(App);