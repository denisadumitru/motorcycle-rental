import { Link, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../config/routes';
import Layout from './Layout';

export default function UserLayout(props) {
  const { children } = props;

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout
      header={
        <Tabs
          value={location.pathname}
          onChange={(evt, value) => navigate(value)}
        >
          <Tab
            label='Browse motorcycles'
            component={Link}
            value={routes.BrowseMotorcycles}
            to={routes.BrowseMotorcycles}
          />
          <Tab
            label='My reservations'
            component={Link}
            value={routes.MyReservations}
            to={routes.MyReservations}
          />
        </Tabs>
      }
    >
      {children}
    </Layout>
  );
}
