import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export const NotesListItem = (props) => {
    const { title, updatedAt } = props.note
    return (
        <div>
            <h5>{title || 'untitled note'}</h5>
            <p>{moment(updatedAt).format('D/M/YY')}</p>
        </div>
    )
}

NotesListItem.propTypes = {
    note: PropTypes.object.isRequired,
}
export default NotesListItem;
