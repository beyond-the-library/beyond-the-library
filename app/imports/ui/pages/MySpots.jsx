import React from 'react';
import { Card, Container, Loader, Button, Grid, Header, Menu, Divider } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import MySpotsCard from '../components/MySpotsCard';
import { Spots } from '../../api/spot/Spots';

class MySpots extends React.Component {

  titleHelp() {
    // eslint-disable-next-line max-len
    (swal({
      title: 'Welcome',
      text: 'Welcome to MySpots Page! You can contribute your favorite study spots here.',
      button: 'Next',
    })
        .then(() => {
          (swal({
            text: 'Click the blue button in the middle of the screen to share your first spot!',
            button: 'Got it',
          }));
        }));
  }

  title() {
    if (this.props.spots.length < 1) {
      return (
          <Divider>{this.titleHelp()}</Divider>
      );
    }
    return (<Divider/>);
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          {this.title()}
          <Card.Group>
            {this.props.spots.map((spot, index) => (<MySpotsCard key={index} spot={spot}/>))}
          </Card.Group>
          <Card centered>
            <Link to="/addspot">
              <Button fluid primary>Click Here to Contribute a New Spot</Button>
            </Link>
          </Card>
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
