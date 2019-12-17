import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loader, Grid, Container, Button, Header } from 'semantic-ui-react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import MapsNote from '../components/MapsNote';
import { Notes } from '../../api/note/Notes';
import { Spots } from '../../api/spot/Spots';
import SpotCard from '../components/SpotCard';

class LocationsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSpot: null,
    };
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Rendering the map</Loader>;
  }

  showSpotCard() {
    if (this.state.currentSpot != null) {
      return (
          <Grid centered>
            <h1>Spot Updates</h1>
            <Grid.Row>
              {/* eslint-disable-next-line max-len */}
              <SpotCard spot={this.state.currentSpot} notes={this.props.notes.filter(note => (note.contactId === this.state.currentSpot._id))} />
            </Grid.Row>
            <Grid.Row>
              <Link to={'/discovery'}>
                <Button color='blue'>Contribute a Spot</Button>
              </Link>
            </Grid.Row>
            <Grid.Row>
              <Link to={'/mySpots'}>
                <Button color='blue'>Share My Spots</Button>
              </Link>
            </Grid.Row>
          </Grid>
      );
    }
    return (
        <Grid>
          <Grid.Row text-align='center'>
            <Header as='h1'> Spot Updates </Header>
            {/* eslint-disable-next-line max-len */}
            {(this.props.notes.slice(this.props.notes.length - 8, this.props.notes.length - 1)).map((note, index) => <MapsNote key={index} note={note}/>)}
          </Grid.Row>
        </Grid>
    );
  }

  renderPage() {
    const uhPosition = [21.2982, -157.8171];
    return (
        <Container>
          <h1>Beyond the Library Map</h1>
          <Grid columns={2}>
            <Grid.Column width={12}>
              <Map className='map' center={uhPosition} zoom={16}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {/* eslint-disable-next-line max-len */}
                {_.map(this.props.spots, (spot, index) => (
                    <Marker position={[spot.latitude, spot.longitude]} key={index}>
                      <Popup onOpen={() => this.setState({ currentSpot: spot })}>
                        {spot.name}
                      </Popup>
                    </Marker>))}
              </Map>
            </Grid.Column>
            <Grid.Column width={4}>
              {this.showSpotCard()}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

LocationsPage.propTypes = {
  notes: PropTypes.array.isRequired,
  spots: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  mapmarker: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subs1 = Meteor.subscribe('Spots');
  const subs2 = Meteor.subscribe('AggregatedNotes');

  return {
    spots: Spots.find({ status: 'Published' }).fetch(),
    notes: Notes.find({}).fetch(),
    ready: subs1.ready() && subs2.ready(),
  };
})(LocationsPage);
