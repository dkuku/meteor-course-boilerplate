import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { NotesListItem } from './NotesListItem';

if (Meteor.isClient){
    describe('NotesListItem', ()=>{
        it('should render title and timestamp',()=>{
            const title = 'test title';
            const timeStamp = 1530589418098
            const timeFromTimeStamp = '4/7/18'
            const note = {title, timeStamp};
            const wrapper = mount(<NotesListItem note={note}/>)
            expect(wrapper.find('h5').text()).toBe(title);
            expect( wrapper.find('p').text()).toBe(timeFromTimeStamp);
        })
        it('should render placeholder text if no title provided',()=>{
            const note = {};
            const wrapper = mount(<NotesListItem note={note}/>)

            expect(wrapper.find('h5').text().length).toBeGreaterThan(0);
        })
    })
}
