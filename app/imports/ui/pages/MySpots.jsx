import React from 'react';
import { Card, Container, Loader, Button, Grid, Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MySpotsCard from '../components/MySpotsCard';
import { Spots } from '../../api/spot/Spots';

class MySpots extends React.Component {

  title() {
    if (this.props.spots.length < 1) {
      return (
          <Header>It is Empty!</Header>
      );
    }
    return (<div></div>);
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Grid>
            <Grid.Row>
              {this.title()}
              <Card.Group>
                {this.props.spots.map((spot, index) => (<MySpotsCard key={index} spot={spot}/>))}
              </Card.Group>
              <Grid.Row>
                <Link to="/addspot">
                  <Button>Click Here to Add a New Spot</Button>
                </Link>
              </Grid.Row>
            </Grid.Row>
          </Grid>
        </Container>

    );
  }
}

/** Require an array of Stuff documents in the props. */
MySpots.propTypes = {
  spots: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('MySpots');
  return {
    spots: Spots.find({}).fetch(),
    ready: subscription.ready(),
  };
})(MySpots);
