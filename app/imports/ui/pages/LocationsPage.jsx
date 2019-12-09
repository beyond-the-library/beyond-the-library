import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { Container } from 'semantic-ui-react';
import MapComponent from '../components/MapComponent';
import { MapMarker } from '../../api/mapmarker/MapMarker';


class TestLocationsPage extends Component {
  render() {
    return (
        <div>
          <h1>Map of the Study Locations</h1>
          <MapComponent className='map' lat={21.3156} lng={-157.8157} zoom={16}></MapComponent>
          {/*{this.props.mapmarker.map((data, index) => (<MapComponent key={index} data={data}/>))}*/}
        </div>
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

// eslint-disable-next-line no-lone-blocks
{ /* <Map className='map'center={position} zoom={this.state.zoom}> */ }
{ /*  <TileLayer */ }
{ /*      attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors' */ }
{ /*      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" */ }
{ /*  /> */ }
{ /*  <Marker position={position}> */ }
{ /*    <Popup> */ }
{ /*      A pretty CSS3 popup. <br /> Easily customizable. */ }
{ /*    </Popup> */ }
{ /*  </Marker> */ }
{ /* </Map> */ }
