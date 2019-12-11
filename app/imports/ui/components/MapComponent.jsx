import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';

class MapComponent extends Component {
  render() {
    console.log(this.props.mapmarker[0].lat);
    return (
        <Map className='map' center={[this.props.lat, this.props.lng]} zoom={this.props.zoom}>
          <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {/* eslint-disable-next-line max-len */}
          {_.map(this.props.mapmarker, marker => (<Marker position={[marker.lat, marker.lng]}>
            <Popup>
              {marker.name}
            </Popup>
          </Marker>))}
        </Map>);
  }
}

MapComponent.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  mapmarker: PropTypes.array.isRequired,
};

export default withRouter(MapComponent);
