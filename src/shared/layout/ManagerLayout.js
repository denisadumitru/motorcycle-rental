import { Link, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../config/routes';
import Layout from './Layout';

export default function ManagerLayout(props) {
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
            label='Users'
            component={Link}
            value={routes.UsersDashboard}
            to={routes.UsersDashboard}
          />
          <Tab
            label='Motorcycles'
            component={Link}
            value={routes.MotorcyclesDashboard}
            to={routes.MotorcyclesDashboard}
          />
        </Tabs>
      }
    >
      {children}
    </Layout>
  );
}
