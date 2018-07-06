import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PrivateHeader } from './PrivateHeader'

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
    describe('PrivateHeader', () => {
        let handleNavToggle;
        let isNavOpen;

        beforeEach(()=>{
            handleNavToggle = expect.createSpy();
            isNavOpen = true;
        })
        it('should set button text to logout', () => {
            const wrapper = mount(<PrivateHeader title="" handleNavToggle={handleNavToggle} isNavOpen={isNavOpen} handleLogout={()=>{}}/>)
            const buttonText = wrapper.find('button').text()
            expect(buttonText).toBe('Logout');
        })

        it('should set title according to props', () => {
            const title="Title"
            const wrapper = mount(<PrivateHeader title={title}  handleNavToggle={handleNavToggle} isNavOpen={isNavOpen} handleLogout={()=>{}}/>)
            const titleText = wrapper.find('h1').text()
            expect(titleText).toBe(title);
        })

        it('should call handleLogout on Click', ()=>{
            const spy = expect.createSpy();
            const wrapper = mount(<PrivateHeader title={''} handleNavToggle={handleNavToggle} isNavOpen={isNavOpen} handleLogout={spy}/>)
            wrapper.find('button').simulate('click');
            expect(spy).toHaveBeenCalled();
        })
    });
}
