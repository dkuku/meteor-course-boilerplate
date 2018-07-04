import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { createBrowserHistory } from 'history'
import 'babel-polyfill';

const history = createBrowserHistory();

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});
Tracker.autorun(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    if (selectedNoteId) {
        history.replace(`/dashboard/${selectedNoteId}`);
    }
});

Meteor.startup(() => {
    Session.set('selectedNoteId', undefined);
    ReactDOM.render(routes, document.getElementById('app'));
});
