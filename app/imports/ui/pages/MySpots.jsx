import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MySpotsCard from '../components/MySpotsCard';
import { Spots } from '../../api/spot/Spots';

class MySpots extends React.Component {
  render() {
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Card.Group>
              {this.props.spots.map((spot, index) => (<MySpotsCard key={index} spot={spot}/>))}
          </Card.Group>
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
  const subscription = Meteor.subscribe('Spots');
  return {
    spots: Spots.find({}).fetch(),
    ready: subscription.ready(),
  };
})(MySpots);
