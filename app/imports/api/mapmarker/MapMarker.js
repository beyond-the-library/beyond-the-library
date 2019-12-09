import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const MapMarker = new Mongo.Collection('MapMarker');

/** Define a schema to specify the structure of each document in the collection. */
const MapMarkerSchema = new SimpleSchema({
  name: String, // name of the spot
  lat: Number,
  lng: Number,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
MapMarker.attachSchema(MapMarkerSchema);

/** Make the collection and schema available to other code. */
export { MapMarker, MapMarkerSchema };
