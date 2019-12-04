import { Meteor } from 'meteor/meteor';
import { Spots } from '../../api/spot/Spots.js';

/** This subscription publishes all the documents associated with the spots app */
Meteor.publish('Spots', function publish() {
  return Spots.find();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin.
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
}); */
