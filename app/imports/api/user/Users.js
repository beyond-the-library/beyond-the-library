import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Users = new Mongo.Collection('UserProfiles');

/** Define a schema to specify the structure of each document in the collection. */
const UsersSchema = new SimpleSchema({
  email: String, // Email Name
  username: String, // Actual name of user
  password: String,
  image: String, // a link to the picture of the user
  description: String, // extra information for display
  major: String,
  favoriteSpot: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Users.attachSchema(UsersSchema);

/** Make the collection and schema available to other code. */
export { Users, UsersSchema };
