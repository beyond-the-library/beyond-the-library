import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader, Grid, Container, Button } from 'semantic-ui-react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Spots } from '../../api/spot/Spots';
import { Notes } from '../../api/note/Notes';
import SpotCard from '../components/SpotCard';

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
              <SpotCard spot={this.props.doc} notes={this.props.notes}/>
              <Link to={'/discovery'}>
                <Button color='blue'>Find Another Spot</Button>
              </Link>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

OneSpotLocationPage.propTypes = {
  notes: PropTypes.array.isRequired,
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Spots');
  const subs2 = Meteor.subscribe('Notes');
  return {
    doc: Spots.findOne(documentId),
    notes: Notes.find().fetch(),
    ready: subscription.ready() && subs2.ready(),
  };
})(OneSpotLocationPage);
