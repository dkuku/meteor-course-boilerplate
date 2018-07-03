import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount, shallow, render } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom'

import { Signup } from './Signup'

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
    describe('Signup', () => {
        it('should show error messages', () => {
            const error = 'This is not working';
            const wrapper = shallow(<Signup createUser={()=>{}}/>);
            wrapper.setState({error});
            const errorMessage = wrapper.find('p').text()
            expect(errorMessage).toBe(error);

            wrapper.setState({error: ''});
            expect(wrapper.find('p').length).toBe(0);
        })

        it('should call createUser with the form data', () => {
            const email='test@we.rt';
            const password='password123';
            const spy = expect.createSpy();
            const wrapper = mount(
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Signup createUser={spy}/>
                </MemoryRouter>);
            wrapper.find({type: 'email'}).instance().value = email
            wrapper.find({type: 'password'}).instance().value = password
            wrapper.find('form').simulate('submit');

            expect(spy).toHaveBeenCalled();
            expect(spy.calls[0].arguments[0]).toEqual({email, password});

        })

        it('should set error when password too short',()=>{
            const email='test@we.rt';
            const password='password           ';
            const wrapper = mount(
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Signup createUser={()=>{}}/>
                </MemoryRouter>);

            wrapper.find({type: 'email'}).instance().value = email
            wrapper.find({type: 'password'}).instance().value = password
            wrapper.find('form').simulate('submit');

            expect(wrapper.find(Signup).instance().state.error.length).toBeGreaterThan(0);
        })

        it('should set createUser callback errors',()=>{
            const email='test@we.rt';
            const password='password123';
            const reason = 'error reason';
            const spy = expect.createSpy();
            const wrapper = mount(
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Signup createUser={spy}/>
                </MemoryRouter>);

            wrapper.find({type: 'email'}).instance().value = email
            wrapper.find({type: 'password'}).instance().value = password
            wrapper.find('form').simulate('submit');
            spy.calls[0].arguments[1]({reason});

            expect(wrapper.find(Signup).instance().state.error).toEqual(reason);

            spy.calls[0].arguments[1]();
            expect(wrapper.find(Signup).instance().state.error.length).toBe(0);
        })
    });
}
