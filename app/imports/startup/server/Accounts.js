import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, username, password, role, image, description, major, favoriteSpot) {
  console.log(`  Creating user ${email} with image ${image} and favorite spot: ${favoriteSpot}`);
  const userID = Accounts.createUser({
    email: email,
    username: username,
    password: password,
    image: image,
    description: description,
    major: major,
    favoriteSpot: favoriteSpot,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(
        ({ email, username, password, role, image, description, favoriteSpot }) => createUser(
            email, username, password, role, image, description, favoriteSpot,
        ),
    );
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

/* function returnUser(email) {
  console.log(`This is the user you asked for ${email}`);
  const userID = Accounts.returnUser({email: email});
} */
