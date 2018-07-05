import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { NotesListHeader } from './NotesListHeader';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient){
    describe('NotesListHeader', ()=>{
        let meteorCall;
        let Session;

        beforeEach(()=>{
            meteorCall = expect.createSpy();
            Session = { set: expect.createSpy() };
        })

        it('should call meteorCall on click',()=>{
            const wrapper = mount(<NotesListHeader meteorCall={meteorCall} Session={Session}/>);
            wrapper.find('button').simulate('click');
            meteorCall.calls[0].arguments[1](undefined, notes[0]._id);

            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id)
        })

        it('should should not set session for failed insert',()=>{
            const wrapper = mount(<NotesListHeader meteorCall={meteorCall} Session={Session}/>);
            wrapper.find('button').simulate('click');
            meteorCall.calls[0].arguments[1]({}, undefined);

            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
            expect(Session.set).toNotHaveBeenCalled()
        })
    })
}
