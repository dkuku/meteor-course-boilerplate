import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount, shallow } from 'enzyme';

import { notes } from '../fixtures/fixtures';
import { Editor } from './Editor';

if (Meteor.isClient){
    describe('Editor', ()=>{
        let history;
        let meteorCall;
        let Session;

        beforeEach(()=>{
            meteorCall = expect.createSpy();
            history = { push: expect.createSpy() };
            Session = { set: expect.createSpy() };
        })
        const defaultProps = {meteorCall, history, Session}

        it('should display not found when there is no note with selectedId',()=>{
            const wrapper = shallow(
                <Editor selectedNoteId={notes[1]._id} meteorCall={meteorCall} history={history} Session={Session}/>
            )
            expect( wrapper.find('p').text()).toBe('Note not found');
        })

        it('should display pick or create when there is no selectedId',()=>{
            const wrapper = shallow(
                <Editor meteorCall={meteorCall} history={history} Session={Session}/>
            )
            expect( wrapper.find('p').text()).toBe('Pick or create a note to get started');
        })

        it('should remove note when clicked remove button',()=>{
            const wrapper = mount(
                <Editor  note={notes[0]} selectedNoteId={notes[0]._id} meteorCall={meteorCall} history={history} Session={Session}/>
            )
            wrapper.find('button').simulate('click');
            expect(history.push).toHaveBeenCalledWith('/dashboard');
            expect(meteorCall).toHaveBeenCalledWith('notes.remove', notes[0]._id);
        })

        it('should update the note body on textarea change',()=>{
            const newBody = "New body text";
            const wrapper = shallow(
                <Editor  note={notes[0]} selectedNoteId={notes[0]._id} meteorCall={meteorCall} history={history} Session={Session}/>
            )
            wrapper.find('textarea').simulate('change', {target: {value: newBody}});

            expect(wrapper.state('body')).toBe(newBody)
            expect(meteorCall).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newBody});
        })

        it('should update the note title on textarea change',()=>{
            const newTitle = "New title text";
            const wrapper = shallow(
                <Editor  note={notes[1]} selectedNoteId={notes[1]._id} meteorCall={meteorCall} history={history} Session={Session}/>
            )
            wrapper.find('input').simulate('change', {target: {value: newTitle}});

            expect(wrapper.state('title')).toBe(newTitle)
            expect(meteorCall).toHaveBeenCalledWith('notes.update', notes[1]._id, {title: newTitle});
        })

        it('should set state for new note',()=>{
            const newTitle = "New title text";
            const newBody = "New body text";
            const wrapper = shallow(
                <Editor meteorCall={meteorCall} history={history} Session={Session}/>
            )
            wrapper.setProps({
                selectedNoteId: notes[2]._id,
                note: notes[2],
            })
            expect(wrapper.state('title')).toBe(notes[2].title);
            expect(wrapper.state('body')).toBe(notes[2].body);
        })

        it('should not set state if note prop not provided',()=>{
            const newTitle = "New title text";
            const newBody = "New body text";
            const wrapper = shallow(
                <Editor meteorCall={meteorCall} history={history} Session={Session}/>
            )
            wrapper.setProps({
                selectedNoteId: notes[2]._id,
            })
            expect(wrapper.state('title')).toBe('');
            expect(wrapper.state('body')).toBe('');
        })
    })
}
