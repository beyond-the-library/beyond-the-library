import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, role, image, favoritespot) {
  console.log(`  Creating user ${email} with image ${image} and favorite spot: ${favoritespot}`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    image: image,
    favoritespot: favoritespot,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    // eslint-disable-next-line max-len
    Meteor.settings.defaultAccounts.map(({ email, password, role, image, favoritespot }) => createUser(email, password, role, image, favoritespot));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

/* function returnUser(email) {
  console.log(`This is the user you asked for ${email}`);
  const userID = Accounts.returnUser({email: email});
} */
