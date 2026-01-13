import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../ui/context/AuthContext';
import { LoaderFullScreen } from '../ui/components/LoaderFullScreen';

/**
 * type: 'private' | 'public'
 */
export const RouteWrapper = ({ children, type = 'private' }) => {
    const { user } = useAuthContext();

    if (type === 'private' && !user) return <Navigate to="/" replace />;
    if (type === 'public' && user) return <Navigate to="/dashboard" replace />;

    return children;
};