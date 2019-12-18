import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Segment, Button, Divider, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Users } from '../../api/user/Users';
import DisplayUser from '../components/DisplayUser';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToMySpots: false,
    };
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Card.Group>
            <DisplayUser user={this.props.user}/>
          </Card.Group>
          <Divider hidden/>
          <Grid centered>
          <Segment>
            <Button as={NavLink} exact to={'/editPassword'}> Change Password</Button>
            <Link to={`/editProfile/${this.props.user._id}`}>
              <Button color='blue'>Edit Profile</Button>
            </Link>
          </Segment>
          </Grid>
          <Divider hidden/>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Users');
  return {
    user: Users.findOne({ username: Meteor.user() ? Meteor.user().username : '' }),
    ready: subscription.ready(),
  };
})(UserProfile);
