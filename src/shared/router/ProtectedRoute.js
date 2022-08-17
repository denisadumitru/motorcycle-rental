import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthUser } from '@react-query-firebase/auth';

import { auth } from '../../firebase';
import routes from '../../config/routes';
import useUser from '../hooks/useUser';

export default function ProtectedRoute(props) {
  const { children, adminOnly, usersOnly } = props;

  const user = useAuthUser(['user'], auth);
  const authenticatedUser = useUser();
  const isAuthenticated = user.data && authenticatedUser?.userData;
  const userRole = authenticatedUser.userData?.role;

  if (user.isLoading || authenticatedUser.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.error || authenticatedUser.error || !isAuthenticated)
    return <Navigate to={routes.Login} replace />;

  if (
    isAuthenticated &&
    ((adminOnly && userRole !== 'manager') ||
      (usersOnly && userRole !== 'user'))
  ) {
    return <Navigate to='/' replace />;
  }

  return children;
}
