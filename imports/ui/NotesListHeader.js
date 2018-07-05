import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export const NotesListHeader = (props) => {
    return (
        <div>
            <button onClick={() => props.meteorCall('notes.insert', (err, res) => {
                if (res) {
                    props.Session.set('selectedNoteId', res);
                }
            })}> Create note </button>
        </div>
    )
}

NotesListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired,
}

export default withTracker(()=>{
    return {
        meteorCall: Meteor.call,
        Session
    }
})(NotesListHeader);
