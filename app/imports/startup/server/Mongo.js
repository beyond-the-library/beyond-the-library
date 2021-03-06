import { Meteor } from 'meteor/meteor';
import { Spots } from '../../api/spot/Spots.js';
import { Users } from '../../api/user/Users';
import { Notes } from '../../api/note/Notes';


/* eslint-disable no-console */

/** Initialize the database with a default data document. */
// function addData(data) {
//   console.log(`  Adding: ${data.name} (${data.owner})`);
//   Spots.insert(data);
// }
//
// /** Initialize the collection if empty. */
// if (Spots.find().count() === 0) {
//   if (Meteor.settings.defaultSpots) {
//     console.log('Creating default spots data.');
//     Meteor.settings.defaultSpots.map(data => addData(data));
//   }
// }

function addSpot(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Spots.insert(data);
}

if (Spots.find().count() === 0) {
  if (Meteor.settings.defaultSpots) {
    console.log('Creating default spots.');
    Meteor.settings.defaultSpots.map(data => addSpot(data));
  }
}

function addUserProfile(data) {
  console.log(`  Adding: ${data.username} Owner: ${data.email}`);
  Users.insert(data);
}

if (Users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating default users');
    Meteor.settings.defaultAccounts.map(data => addUserProfile(data));
  }
}

function addNote(data) {
  console.log(`  Adding: (${data.owner})`);
  Notes.insert(data);
}

if (Notes.find().count() === 0) {
  if (Meteor.settings.defaultNotes) {
    console.log('Creating default spots.');
    Meteor.settings.defaultNotes.map(data => addNote(data));
  }
}
