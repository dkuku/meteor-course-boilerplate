import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import 'babel-polyfill';

import { AppRouter, history } from '../imports/routes/AppRouter';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    if (selectedNoteId) {
        history.replace(`/dashboard/${selectedNoteId}`);
    }
});

Meteor.startup(() => {
    Session.set('selectedNoteId', undefined);
    ReactDOM.render(<AppRouter/>, document.getElementById('app'));
});
