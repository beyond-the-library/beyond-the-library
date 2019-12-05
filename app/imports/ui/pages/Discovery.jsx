import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Card } from 'semantic-ui-react';
import SpotCard from '/imports/ui/components/SpotCard.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Spots } from '../../api/spot/Spots.js';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Discovery extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Discover New Spots</Header>
          <Card.Group centered>
            {this.props.spots.map((spot, index) => <SpotCard key={index} spot={spot}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Discovery.propTypes = {
  spots: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Spots documents.
  Meteor.subscribe('Spots');
  return {
    spots: Spots.find({}).fetch(),
  };
})(Discovery);
