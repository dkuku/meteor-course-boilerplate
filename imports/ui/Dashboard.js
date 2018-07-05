import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { withRouter } from 'react-router-dom';

import PrivateHeader from './PrivateHeader';
import NotesList from './NotesList';
import Editor from './Editor';

class Dashboard extends Component {
    componentDidMount(){
        if (this.props.match.params.id){
            Session.set('selectedNoteId', this.props.match.params.id)
        }
    }
    componentWillUnmount(){
        Session.set('selectedNoteId', undefined)
    }

    render() {
        return (
            <div>
                <PrivateHeader title="Dashboard"/>
                <div className="page-content">
                    <div className="page-content__sidebar">
                        <NotesList />
                    </div>
                    <div className="page-content__main">
                        <Editor/>
                    </div>
                </div>
            </div>
        )
    };
};

export default withRouter(Dashboard);
