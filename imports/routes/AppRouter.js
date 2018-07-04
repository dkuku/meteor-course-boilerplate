import { Meteor } from 'meteor/meteor';
import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Router, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

export const history = createBrowserHistory();

export const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <PublicRoute path="/" component={Login} exact={true} />
            <PublicRoute path="/signup" component={Signup} />
            <PrivateRoute path="/dashboard/" exact={true} component={Dashboard} />
            <PrivateRoute path="/dashboard/:id" component={Dashboard} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);
