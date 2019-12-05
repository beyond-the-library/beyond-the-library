import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Form, Card } from 'semantic-ui-react';
import SpotCard from '/imports/ui/components/SpotCard.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
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
          <Form>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Name' placeholder='Name'/>
              <Form.Select
                  fluid
                  label='Major'
                  options={[{ key: 'Computer Science', text: 'CS' }, { key: 'Computer Engineering', text: 'CENG' },
                    { key: 'Music', text: 'Music' }, { key: 'Open for everyone', text: 'Open for everyone' }]}
                  placeholder='Major'
              />
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
            <Form.Group>
              <Form.Button>Apply Filter</Form.Button>
              <Form.Button>Add a New Study Spot</Form.Button>
            </Form.Group>
          </Form>
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
