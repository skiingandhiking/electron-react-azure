import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const LoginRoute = ({component: Component, authenticated, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => authenticated !== true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
        />
    );
};

export default LoginRoute;