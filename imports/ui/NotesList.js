import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import NotesListHeader from './NotesListHeader'
import NotesListItem from './NotesListItem'
import NotesListEmptyItem from './NotesListEmptyItem'

export const NotesList = (props) => {
    return (
        <div>
            <NotesListHeader />
            {`NotesList ${ props.notes.length }`}
            {(props.notes.length === 0) ?
            <NotesListEmptyItem /> :
            props.notes.map(note=>
                <NotesListItem key={note._id} note={note}/>
            )}
        </div>
    );
};

NotesList.propTypes = {
    notes: PropTypes.array.isRequired
}
export default withTracker(()=>{
    const selectedNoteId = Session.get('selectedNoteId')
    Meteor.subscribe('notes');
    return {
        notes: Notes.find().fetch().map(note => {
            return {
                ...note,
                selected: selectedNoteId === note._id
            }
        })
    }
})(NotesList);
