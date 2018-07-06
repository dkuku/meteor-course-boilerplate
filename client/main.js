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
        Session.set('isNavOpen', false);
    }
});

Tracker.autorun(() => {
    const isNavOpen = Session.get('isNavOpen');
    document.body.classList.toggle('is-nav-open', isNavOpen);
})

Meteor.startup(() => {
    Session.set('selectedNoteId', undefined);
    Session.set('isNavOpen', false);
    ReactDOM.render(<AppRouter/>, document.getElementById('app'));
});
