import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader, Grid, Container } from 'semantic-ui-react';
import MapComponent from '../components/MapComponent';
import { MapMarker } from '../../api/mapmarker/MapMarker';

class LocationsPage extends Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Rendering the map</Loader>;
  }

  renderPage() {
    const uhposition = [21.2969, -157.8171];
    return (
        <Container>
          <h1>Beyond the Library Map</h1>
          <Grid columns={2}>
            <Grid.Column width={12}>
              {/* eslint-disable-next-line max-len */}
              <MapComponent className='map' lat={uhposition[0]} lng={uhposition[1]} zoom={16} mapmarker={this.props.mapmarker}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <h1>Updates on Spots</h1>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

LocationsPage.propTypes = {
  mapmarker: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subs1 = Meteor.subscribe('MapMarker');
  return {
    mapmarker: MapMarker.find({}).fetch(),
    ready: subs1.ready(),
  };
})(LocationsPage);

//
// <h1>Map of the Study Locations</h1>
// {/* eslint-disable-next-line max-len */}
// {/*<MapComponent className='map' lat={21.3156} lng={-157.8157} zoom={16} mapmarker={this.props.mapmarker}/>*/}
