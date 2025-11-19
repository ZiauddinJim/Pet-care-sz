import React, { useContext } from 'react';
import AuthContext from './AuthContext';
import { Navigate, useLocation } from 'react-router';
import Spinner from '../Components/Spinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();
    // console.log(location);
    // console.log(user);
    if (loading) {
        return <Spinner />
    }
    if (user) {
        return children;
    } return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>
};

export default PrivateRoute;