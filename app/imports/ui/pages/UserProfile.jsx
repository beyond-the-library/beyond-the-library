import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Grid, Segment, Button, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/Users';
// import UserComponent from '../components/UserComponent';
import AllSpotsCard from '../components/AllSpotsCard';
import { Spots } from '../../api/spot/Spots';

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
                  {/* {this.props.users.map((user, index) => (<UserComponent key={index} user={user}/>))} */}
                  <Image src='images/momoadmin.jpg' size='medium' fluid/>
                </Container>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <p></p>
                </Segment>
                <Segment>
                  <p>List of favorite spots:</p>
                  {this.props.spots.map((spot, index) => (<AllSpotsCard key={index} spot={spot}/>))}
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
  spots: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Users');
  return {
    users: Users.find({}).fetch(),
    spots: Spots.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserProfile);
