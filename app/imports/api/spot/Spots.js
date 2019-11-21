import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Spots = new Mongo.Collection('Spots');

/** Define a schema to specify the structure of each document in the collection. */
const Spotschema = new SimpleSchema({
  name: String,
  quantity: Number,
  owner: String,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Spots.attachSchema(Spotschema);

/** Make the collection and schema available to other code. */
export { Spots, Spotschema };
