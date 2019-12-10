import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { Container } from 'semantic-ui-react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapMarker } from '../../api/mapmarker/MapMarker';


class TestLocationsPage extends Component {
  render() {
    return (
        <Map className='map'center={[21.2969, -157.8171]} zoom={16}>
          <TileLayer
              attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={[21.2969, -157.8171]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
    );
  }
}

TestLocationsPage.propTypes = {
  mapmarker: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subs1 = Meteor.subscribe('MapMarker');
  return {
    mapmarker: MapMarker.find({}).fetch(),
    ready: subs1.ready(),
  };
})(TestLocationsPage);
