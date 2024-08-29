import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({children}) {
    const {accessToken} = useSelector((state)=> state.authLogin)

    if (!accessToken){
         return <Navigate to="/login" />;
    }
    return children;
}

export default PrivateRoute