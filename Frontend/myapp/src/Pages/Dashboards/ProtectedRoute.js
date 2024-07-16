import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, requiredRole, ...rest }) => {
    const role = localStorage.getItem('role');
    return (
        <Route
            {...rest}
            render={props =>
                role === requiredRole ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
