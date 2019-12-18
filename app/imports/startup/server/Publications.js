import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Spots } from '../../api/spot/Spots';
import { Users } from '../../api/user/Users';
import { MapMarker } from '../../api/mapmarker/MapMarker';
import { Notes } from '../../api/note/Notes';

/** This subscription publishes all the documents associated with the spots app */
Meteor.publish('Spots', function publish() {
  return Spots.find();
});

Meteor.publish('User', function publish() {
    return Users.findOne({ username: Meteor.user().username });
});

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

/** Used as the subscription for all the map markers. */
Meteor.publish('MapMarker', function publish() {
  return MapMarker.find();
});

/** In development, meant as the subscription for favorited spots. */
Meteor.publish('FavoriteSpots', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Spots.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('Notes', function publish() {
  return Notes.find();
});

Meteor.publish('MapsNotes', function publish() {
  function formatTime(time) {
    return time.toLocaleDateString('en-us');
  }

  function compareTime(time) {
    return time === new Date();
  }
  if (compareTime(formatTime(Notes.createdAt))) {
    return Notes.find();
  }
  return this.ready();
});

Meteor.publish('AggregatedNotes', function publish() {
  return Notes.find();
});
