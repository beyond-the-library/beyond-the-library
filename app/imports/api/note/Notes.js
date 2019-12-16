import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Notes = new Mongo.Collection('Notes');

const NotesSchema = new SimpleSchema({
  note: String,
  owner: String,
  contactId: String,
  createdAt: Date,
}, { tracker: Tracker });

Notes.attachSchema(NotesSchema);

export { Notes, NotesSchema };
