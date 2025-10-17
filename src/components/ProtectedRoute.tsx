import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { useEffect, useState } from 'react';

export const ProtectedRoute = () => {
    const navigate = useNavigate();
    const  checkLogged = async () => {
        const storedUser = await localStorage.getItem("auth_user");
        
        if (!storedUser) {
            navigate('/login', {
                replace: true
            })
        }
    }
    useEffect(() => {
        checkLogged();
    }, []);



  return <Outlet />;
};