import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Notes = new Mongo.Collection('notes');
if (Meteor.isServer) {
    Meteor.publish('notes', function() {
        return Notes.find({userId: this.userId});
    });
}

Meteor.methods({
    'notes.insert'() {
        if(!this.userId){
            throw new Meteor.Error('not-authorized')
        }

        return Notes.insert({
            title: '',
            body: '',
            userId: this.userId,
            updatedAt: new Date().getTime(),
        })
    },
    'notes.remove'(_id) {
        if(!this.userId){
            throw new Meteor.Error('not-authorized')
        }
        new SimpleSchema({
            _id: {
                type: 'string',
                min: 1
            }
        }).validate({_id});

        return Notes.remove({_id, userId: this.userId});
    },
    'notes.update'(_id, updates) {
        if(!this.userId){
            throw new Meteor.Error('not-authorized')
        }
        new SimpleSchema({
            _id: {
                type: 'string',
                min: 1
            },
            title: {
                type: 'string',
                min: 1,
                optional: true
            },
            body: {
                type: 'string',
                min: 1,
                optional: true
            }
        }).validate({_id, ...updates});

        return Notes.update({_id, userId: this.userId},
            {$set: {
                updatedAt: new Date().getTime(),
                ...updates
            }
        });
    }
})

