import React from 'react';
import {Navigate} from 'react-router-dom';
import { useCustomCookies } from '../utils';

const PrivateRoute = (props) => {
    const {children} = props;
    const {isLogin} = useCustomCookies();
    let loggedIn = isLogin();

    if(!loggedIn)
        return <Navigate to="/sign-in"></Navigate>
    return children;
}

export default PrivateRoute;