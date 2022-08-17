import { Routes, Route, Navigate } from 'react-router-dom';
import routes from './config/routes';
import {
  MotorcyclesDashboard,
  BrowseMotorcycles,
  HomeScreen,
  Login,
  MyReservations,
  Register,
  UsersDashboard,
  UserDashboardById,
  MotorcycleDashboardById,
  MotorcycleDetails,
} from './screens';
import { ProtectedRoute } from './shared/router';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<ProtectedRoute>{<HomeScreen usersOnly />}</ProtectedRoute>}
      />
      <Route path={routes.Login} element={<Login />} />
      <Route path={routes.Register} element={<Register />} />
      <Route
        path={routes.Dashboard}
        element={<Navigate to={routes.UsersDashboard} replace />}
      />
      <Route
        path={routes.UsersDashboard}
        element={
          <ProtectedRoute adminOnly>
            <UsersDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${routes.UsersDashboard}/:id`}
        element={
          <ProtectedRoute adminOnly>
            <UserDashboardById />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${routes.MotorcyclesDashboard}/:id`}
        element={
          <ProtectedRoute adminOnly>
            <MotorcycleDashboardById />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.MotorcyclesDashboard}
        element={
          <ProtectedRoute adminOnly>
            <MotorcyclesDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.BrowseMotorcycles}
        element={
          <ProtectedRoute usersOnly>
            <BrowseMotorcycles />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.MyReservations}
        element={
          <ProtectedRoute usersOnly>
            <MyReservations />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${routes.MotorcycleDetails}/:id`}
        element={
          <ProtectedRoute>
            <MotorcycleDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
