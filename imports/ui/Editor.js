import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { history } from '../routes/AppRouter';

export class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
    };

    componentDidUpdate(prevProps, prevState){
        const currentNoteId = this.props.note ? this.props.note._id: undefined;
        const prevNoteId = prevProps && prevProps.note ? prevProps.note._id: undefined;

        if ( currentNoteId && currentNoteId !== prevNoteId ) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            })
        }
    }

    handleTitleChange(e) {
        const title = e.target.value;
        this.setState({title});
        this.props.meteorCall('notes.update', this.props.note._id, {title});
    }

    handleBodyChange(e) {
        const body = e.target.value;
        this.setState({body});
        this.props.meteorCall('notes.update', this.props.note._id, {body});
    }

    handleNoteRemove() {
        this.props.meteorCall('notes.remove', this.props.note._id);
        this.props.history.push('/dashboard');
    }

    render() {
        const {note, selectedNoteId} = this.props;
        const {title, body} = this.state
        if (note) {
            return(
                <div>
                    <input value={title} placeholder={'Note title'} onChange={this.handleTitleChange.bind(this)}/>
                    <textarea value={body} placeholder={'Note description'} onChange={this.handleBodyChange.bind(this)}/>
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
    meteorCall: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default withTracker(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        meteorCall: Meteor.call,
        history: history,
    };
})(Editor);
