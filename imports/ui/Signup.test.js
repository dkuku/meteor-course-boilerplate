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
            const wrapper = shallow(<Signup createUser={spy}/>);

            wrapper.setState({ email, password })
            wrapper.find('form').simulate('submit', { preventDefault: () => { } });expect(spy).toHaveBeenCalled();
            expect(spy.calls[0].arguments[0]).toEqual({email, password});

        })

        it('should set error when password too short',()=>{
            const email='test@we.rt';
            const password='password           ';
            const spy = expect.createSpy();
            const wrapper = shallow( <Signup createUser={spy}/>);

            wrapper.find({ name: 'email' }).simulate('change', {
                target: {
                    value: email
                }
            });
            wrapper.find({ name: 'password' }).simulate('change', {
                target: {
                    value: password
                }
            });
            wrapper.find('form').simulate('submit', { preventDefault: () => { } });
            expect(wrapper.state('error').length).toBeGreaterThan(0);
        })

        it('should set createUser callback errors',()=>{
            const email='test@we.rt';
            const password='password123';
            const reason = 'error reason';
            const spy = expect.createSpy();
            const wrapper = shallow( <Signup createUser={spy}/>);

            wrapper.setState({ password })
            wrapper.find('form').simulate('submit', { preventDefault: () => { } });
            spy.calls[0].arguments[1]({reason});

            expect(wrapper.state('error')).toEqual(reason);

            spy.calls[0].arguments[1]();
            expect(wrapper.state('error').length).toBe(0);
        })
    });
}
