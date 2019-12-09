import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class MapComponent extends Component {
  render() {
    const uhposition = [this.props.lat, this.props.lng];
    return (
        <Map className='Map' center={uhposition} zoom={this.props.zoom}>
          <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={uhposition}>
            <Popup>
              <p>Test popup</p>
              {/* {this.props.mapmarker.name} */}
            </Popup>
          </Marker>
        </Map>);
  }
}

MapComponent.propTypes = {
  // mapmarker: PropTypes.object.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
};

export default withRouter(MapComponent);
