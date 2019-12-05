import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Spots } from '../../api/spot/Spots';


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
});
* */

Meteor.publish('MySpots', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Spots.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('SpotsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Spots.find();
  }
  return this.ready();
});

/** I think we can use this subscription for all users to see all spots. */
Meteor.publish('AllSpots', function publish() {
  return Spots.find();
});
