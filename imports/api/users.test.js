import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import {validateNewUser} from './users';

if ( Meteor.isServer ) {
    describe('users', () => {
        it('should allow user with vailid email address',()=>{
            const testValidUser = {
                emails: [{
                    address: "test@example.com"
                }]
            }
            const res = validateNewUser(testValidUser);
            expect(res).toBe(true);
        })

        it('should not allow user with invailid email address',()=>{
            const testInvalidUser = {
                emails: [{
                    address: "testsexamplcom"
                }]
            }
            expect(()=>{
                validateNewUser(testInvalidUser);
            }).toThrow();
        })
    })
}
