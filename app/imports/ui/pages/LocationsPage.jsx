import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader, Grid, Container, Card } from 'semantic-ui-react';
import MapComponent from '../components/MapComponent';
import MapsNote from '../components/MapsNote';
import { MapMarker } from '../../api/mapmarker/MapMarker';
import { Notes } from '../../api/note/Notes';
// import AddNote from '../components/AddNote';
import { Spots } from '../../api/spot/Spots';

class LocationsPage extends Component {
  render() {
    const date = new Date('2013-03-10T02:00:00Z');
    const date3 = new Date('2019-12-12T22:48:00Z');
    const date2 = new Date();
    console.log(date3 === date2);
    console.log(date2.toLocaleDateString());
    console.log(`${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`);
    return (this.props.ready) ? this.renderPage() : <Loader active>Rendering the map</Loader>;
  }

  renderPage() {
    const uhposition = [21.2969, -157.8171];

    // function formatTime(time) {
    //   return time.toLocaleDateString('en-us') === new Date();
    // }

    return (
        <Container>
          <h1>Beyond the Library Map</h1>
          <Grid columns={2}>
            <Grid.Column width={12}>
              {/* eslint-disable-next-line max-len */}
              <MapComponent className='map' lat={uhposition[0]} lng={uhposition[1]} zoom={16} spots={this.props.spots}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <h1>Spot Updates</h1>
              <Card.Content extra>
                {this.props.notes.map((note, index) => <MapsNote key={index} note={note}/>)}
              </Card.Content>
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
};

export default withTracker(() => {
  const subs1 = Meteor.subscribe('Spots');
  const subs2 = Meteor.subscribe('Notes');

  return {
    spots: Spots.find({ status: 'Published' }).fetch(),
    notes: Notes.find({ owner: 'john@foo.com' }).fetch(),
    ready: subs1.ready() && subs2.ready(),
  };
})(LocationsPage);
