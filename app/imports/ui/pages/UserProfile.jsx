import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Grid, Segment, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/Users';
import UserComponent from '../components/UserComponent';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Grid centered>
            <Grid.Row>
              <Grid.Column>
                <Container>
                  {/* <Image src={this.props.user.image }fluid/> */}
                  {this.props.users.map((user, index) => (<UserComponent key={index} user={user}/>))}
                </Container>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <p>USERNAME: Admin</p>
                </Segment>
                <Segment>
                  <p>List of favorite spots:</p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Button>Change Password</Button>
                  <Button>Delete Account</Button>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  users: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Users');
  return {
    // stuffs: Stuffs.find({}).fetch(),
    users: Users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserProfile);
