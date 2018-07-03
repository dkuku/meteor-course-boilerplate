import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { NotesListHeader } from './NotesListHeader';

if (Meteor.isClient){
    describe('NotesListHeader', ()=>{
        it('should call meteorCall on click',()=>{
            const spy = expect.createSpy();
            const wrapper = mount(<NotesListHeader meteorCall={spy}/>);
            wrapper.find('button').simulate('click');

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('notes.insert');
        })
    })
}
