import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class Editor extends React.Component {
    constructor(props) {
        super(props);
    };

    handleTitleChange(e) {
        this.props.meteorCall('notes.update', this.props.note._id, {title: e.target.value})
    }

    handleBodyChange(e) {
        this.props.meteorCall('notes.update', this.props.note._id, {body: e.target.value})
    }

    handleNoteRemove() {
        this.props.meteorCall('notes.remove', this.props.note._id)
    }

    render() {
        const {note, selectedNoteId} = this.props;
        if (note) {
            return(
                <div>
                    <input value={note.title} placeholder={'Note title'} onChange={this.handleTitleChange.bind(this)}/>
                    <textarea value={note.body} placeholder={'Note description'} onChange={this.handleBodyChange.bind(this)}/>
                    <button onClick={this.handleNoteRemove.bind(this)}>Remove</button>
                </div>
            )
        } else {
            return(
                <p>
                    { selectedNoteId ?
                    'Note not found' :
                    'Pick or create a note to get started'
                    }
                </p>
            )
        }
    }
}

Editor.propTypes = {
    selectedNoteId: PropTypes.string,
    note: PropTypes.object,
    meteorCall: PropTypes.func.isRequired
};

export default withTracker(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        meteorCall: Meteor.call,
    };
})(Editor);
