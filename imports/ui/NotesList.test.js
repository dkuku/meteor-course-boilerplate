
import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { notes } from '../fixtures/fixtures';
import { NotesList } from './NotesList';
import NotesListItem from './NotesListItem';
import NotesListEmptyItem from './NotesListEmptyItem';

if (Meteor.isClient){
    describe('NotesList', ()=>{
        it('should render NotesListItem for each note',()=>{
            const wrapper = mount(<NotesList notes={notes}/>)
            expect( wrapper.find('NotesListItem').length).toBe(3);
            expect( wrapper.find('NotesListEmptyItem').length).toBe(0);
        })
        it('should render NotesListEmptyItem if zero notes',()=>{
            const wrapper = mount(<NotesList notes={[]}/>)
            expect( wrapper.find('NotesListItem').length).toBe(0);
            expect( wrapper.find('NotesListEmptyItem').length).toBe(1);
        })
    })
}
