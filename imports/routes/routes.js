import { Meteor } from 'meteor/meteor';
import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Router, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const history = createBrowserHistory();
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = (Component) => {
	return Meteor.userId() ?
		<Redirect to='/dashboard'/> :
		<Component/>
}

const onEnterPrivatePage = (Component) => {
	return Meteor.userId() ?
		<Component/> :
		<Redirect to='/'/>
}

export const routes = (
	<Router history={history}>
		<Switch>
			<Route exact path="/" render={() => onEnterPublicPage(Login)} />
			<Route path="/signup" render={() => onEnterPublicPage(Signup)} />
			<Route path="/dashboard" render={() => onEnterPrivatePage(Dashboard)} />
			<Route path="/" component={NotFound} />
		</Switch>
	</Router>
);

export const onAuthChange = (isAuthenticated) => {
	const pathName = history.location.pathname;
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
	const isAuthenticatedPage = authenticatedPages.includes(pathName);

	if (isUnauthenticatedPage && isAuthenticated) {
		history.replace('/dashboard');
	} else if (isAuthenticatedPage && !isAuthenticated) {
		history.replace('/');
	}
}

export default routes;
