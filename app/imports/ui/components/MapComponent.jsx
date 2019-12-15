import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';

/** This component has been merged into Locations Page. It's Not Used. */
class MapComponent extends Component {
  render() {
    return (
        <Map className='map' center={[this.props.lat, this.props.lng]} zoom={this.props.zoom}>
          <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {/* eslint-disable-next-line max-len */}
          {_.map(this.props.spots, (spot, index) => (<Marker position={[spot.latitude, spot.longitude]} key={index}>
            <Popup onOpen={ () => console.log(spot) }>
              {spot.name}
            </Popup>
          </Marker>))}
        </Map>);
  }
}

MapComponent.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  spots: PropTypes.array.isRequired,
};

export default withRouter(MapComponent);
