import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader, Grid, Container } from 'semantic-ui-react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Spots } from '../../api/spot/Spots';

class OneSpotLocationPage extends Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Rendering the map</Loader>;
  }

  renderPage() {
    return (
        <Container>
          <h1>Beyond the Library Map</h1>
          <Grid columns={2}>
            <Grid.Column width={12}>
              {/* eslint-disable-next-line max-len */}
              <Map className='map' center={[this.props.doc.latitude, this.props.doc.longitude]} zoom={17}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {/* eslint-disable-next-line max-len */}
                <Marker position={[this.props.doc.latitude, this.props.doc.longitude]}>
                  <Popup>
                    {this.props.doc.name}
                  </Popup>
                </Marker>
              </Map>
            </Grid.Column>
            <Grid.Column width={4}>
              <h1>Updates on Spots</h1>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

OneSpotLocationPage.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Spots');
  return {
    doc: Spots.findOne(documentId),
    ready: subscription.ready(),
  };
})(OneSpotLocationPage);
