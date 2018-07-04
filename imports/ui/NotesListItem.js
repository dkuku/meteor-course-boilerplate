import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export const NotesListItem = (props) => {
    const { _id, title, updatedAt } = props.note
    return (
        <div onClick={()=>{props.Session.set('selectedNoteId', _id)}}>
            <h5>{title || 'untitled note'}</h5>
            <p>{moment(updatedAt).format('D/M/YY')}</p>
        </div>
    )
}

NotesListItem.propTypes = {
    note: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired,
}

export default withTracker(()=> {
     return { Session }
})(NotesListItem)
