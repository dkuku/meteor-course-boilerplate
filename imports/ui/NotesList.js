import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import NotesListHeader from './NotesListHeader'
import NotesListItem from './NotesListItem'

export const NotesList = (props) => {
    return (
        <div>
            <NotesListHeader />
            {`NotesList ${ props.notes.length }`}
            {props.notes.map(note=> <NotesListItem key={note._id} note={note}/>)}
        </div>
    );
};

NotesList.propTypes = {
    notes: PropTypes.array.isRequired
}
export default withTracker(()=>{
    Meteor.subscribe('notes');
    return {
        notes: Notes.find().fetch()
    }
})(NotesList);
