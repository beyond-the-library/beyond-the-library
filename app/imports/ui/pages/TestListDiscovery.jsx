import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Form } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import TestDiscovery from '/imports/ui/components/TestDiscovery.jsx';
import { Spots } from '../../api/spot/Spots';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class TestListDiscovery extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Discover New Spots</Header>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Major' placeholder='Major'/>
              <Form.Input fluid label='Name' placeholder='Name'/>
              <Form.Select
                  fluid
                  label='Location'
                  options={[{ key: 'onc', text: 'On Campus' }, { key: 'offc', text: 'Off Campus' }]}
                  placeholder='Location'
              />
              <Form.Select
                  fluid
                  label='Environment'
                  options={[{ key: 'i', text: 'Indoor' }, { key: 'o', text: 'Outdoor' }]}
                  placeholder='Environment'
              />
            </Form.Group>
            <Form.Button>Apply Filter</Form.Button>
          </Form>
          <Card.Group centered>
            {this.props.spots.map((spot, index) => <TestDiscovery
                key={index}
                spot={spot}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
TestListDiscovery.propTypes = {
  spots: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('SpotsAdmin');
  return {
    spots: Spots.find({}).fetch(),
    ready: subscription.ready(),
  };
})(TestListDiscovery);
