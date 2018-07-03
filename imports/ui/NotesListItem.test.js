import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import NotesListItem from './NotesListItem';

if (Meteor.isClient){
    describe('NotesListItem', ()=>{
        it('should render title and timestamp',()=>{
            const title = 'test title';
            const timeStamp = 1530589418098
            const timeFromTSamp = '3/7/18'
            const note = {title, timeStamp};
            const wrapper = mount(<NotesListItem note={note}/>)
            const tit = wrapper.find('h5').text();
            const tst = wrapper.find('p').text();
            expect(tit).toBe(title);
            expect(tst).toBe(timeFromTSamp);
        })
        it('should render placeholder text if no title provided',()=>{
            const note = {};
            const wrapper = mount(<NotesListItem note={note}/>)
            const ret = wrapper.find('h5').text();
            expect(ret.length).toBeGreaterThan(0);
        })
    })
}
