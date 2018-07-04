
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount, shallow, render } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom'

import { Login } from './Login'

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
    describe('Login', () => {
        it('should show error messages', () => {
            const error = 'This is not working';
            const wrapper = shallow(<Login loginWithPassword={()=>{}}/>);
            wrapper.setState({error});
            const errorMessage = wrapper.find('p').text()
            expect(errorMessage).toBe(error);

            wrapper.setState({error: ''});
            expect(wrapper.find('p').length).toBe(0);
        })

        it('should call loginWithPassword with the form data', () => {
            const email='test@we.rt';
            const password='password123';
            const spy = expect.createSpy();
            const wrapper = shallow(<Login loginWithPassword={spy} />);

            wrapper.setState({ email, password })
            wrapper.find('form').simulate('submit', {preventDefault:()=>{}});
            expect(spy).toHaveBeenCalled();
            expect(spy.calls[0].arguments[0]).toEqual({email});
            expect(spy.calls[0].arguments[1]).toBe(password);

        })

        it('should set loginWithPassword callback errors',()=>{
            const spy = expect.createSpy();
            const wrapper = shallow( <Login loginWithPassword={spy}/>);

            wrapper.find('form').simulate('submit', {preventDefault: ()=>{}});

            spy.calls[0].arguments[2]({});
            expect(wrapper.state('error').length).toBeGreaterThan(0);

            spy.calls[0].arguments[2]();
            expect(wrapper.state('error').length).toBe(0);
        })
    });
}
