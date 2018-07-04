import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { notes } from '../fixtures/fixtures';
import { NotesListItem } from './NotesListItem';

if (Meteor.isClient){
    describe('NotesListItem', ()=>{
        let Session;

        beforeEach(()=>{
            Session = {
                set: expect.createSpy(),
            }
        });

        it('should render title and timestamp',()=>{
            const timeFromTimeStamp = '3/7/18'
            const wrapper = mount(<NotesListItem note={notes[0]} Session={Session}/>);

            expect(wrapper.find('h5').text()).toBe(notes[0].title);
            expect( wrapper.find('p').text()).toBe(timeFromTimeStamp);
        })

        it('should render placeholder text if no title provided',()=>{
            const wrapper = mount(<NotesListItem note={notes[1]} Session={Session}/>);

            expect(wrapper.find('h5').text().length).toBeGreaterThan(0);
        })

        it('should call set on click',()=>{
            const wrapper = mount(<NotesListItem note={notes[0]} Session={Session}/>);
            wrapper.find('div').simulate('click');

            expect(Session.set).toHaveBeenCalled()
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id)
        })
    })
}
