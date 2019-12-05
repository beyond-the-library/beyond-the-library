import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Users = new Mongo.Collection('Users');

/** Define a schema to specify the structure of each document in the collection. */
const UsersSchema = new SimpleSchema({
  name: String, // name of the spot
  image: String, // a link to the picture of the spot
  description: String, // extra information for display
  major: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Users.attachSchema(UsersSchema);

/** Make the collection and schema available to other code. */
export { Users, UsersSchema };
