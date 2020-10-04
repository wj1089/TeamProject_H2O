import React from 'react';
import { Switch, Redirect, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import { RouteWithLayout } from './admin/components';
import { Main as MainLayout, Minimal as MinimalLayout } from './admin/layouts';
import { chartjs } from './admin/helpers';
import theme from './admin/theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './admin/assets/css/index.css';
import validators from './admin/common/validators';
import {
  Dashboard as DashboardView,
  UsersList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  UsersList as UserView,
  Settings as SettingsView,
  NotFound as NotFoundView,
  Board as BoardView,
  HospitalsList as HospitalView,
  DoctorsList as DoctorView
} from './admin/views';
import { HospitalsAdd } from './admin/views/Hospital/components';
import { DoctorAdd } from './admin/views/Doctor/components'
import { UserAdd } from './admin/views/User/components'


const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

const AdminPage = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router history={browserHistory}>
    <Switch>
      <Redirect
        exact
        from="/admin"
        to="/admin/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/admin/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/admin/users"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/admin/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/admin/icons"
      />
      <RouteWithLayout
        component={UserView}
        exact
        layout={MainLayout}
        path="/admin/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/admin/settings"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/admin/not-found"
      />
      <RouteWithLayout
        component={BoardView}
        exact
        layout={MainLayout}
        path="/admin/Board"
      />
      <RouteWithLayout
        component={HospitalView}
        exact
        layout={MainLayout}
        path="/admin/Hospital"
      />
      <RouteWithLayout
        component={HospitalsAdd}
        exact
        layout={MainLayout}
        path="/admin/HospitalsAdd"
      />
      <RouteWithLayout
        component={DoctorView}
        exact
        layout={MainLayout}
        path="/admin/doctor"
      />
      <RouteWithLayout
        component={DoctorAdd}
        exact
        layout={MainLayout}
        path="/admin/DoctorsAdd"
      />
      <RouteWithLayout
        component={UserAdd}
        exact
        layout={MainLayout}
        path="/admin/UserAdd"
      />
    </Switch>
    </Router>
      </ThemeProvider>
  );
};

export default AdminPage;
