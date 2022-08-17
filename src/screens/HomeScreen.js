import React from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../config/routes';
import useUser from '../shared/hooks/useUser';

export default function HomeScreen() {
  const { userData } = useUser();

  if (userData?.role === 'manager')
    return <Navigate to={routes.UsersDashboard} replace />;

  return <Navigate to={routes.BrowseMotorcycles} replace />;
}
