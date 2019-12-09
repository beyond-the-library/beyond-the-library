import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Grid, Segment, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { NavLink, Redirect } from 'react-router-dom';
import UserComponent from '../components/UserComponent';
import AllSpotsCard from '../components/AllSpotsCard';
// import { Users } from '../../api/user/Users';
// import { Accounts } from 'meteor/accounts-base';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserFile extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  deleteMessage = () => {
    swal({
      title: 'You are deleting you account',
      text: 'Upon deletion, your spots wont be attributed to you anymore.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((deleteuser) => {
          if (deleteuser) {
            Meteor.logout();
            swal('Your account has been deleted.', {
              icon: 'success',
            });
          }
        });
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    return <Redirect to={from}/>;
  }

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
                  {this.props.spots.map((spot, index) => (<AllSpotsCard key={index} spot={spot}/>))}
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Button as={NavLink} exact to={'/editPassword'}> Change Password</Button>
                  <Button onClick={this.deleteMessage}> Delete this account</Button>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserFile.propTypes = {
  spots: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  users: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to User documents.
  const subscription = Meteor.subscribe('Users');
  const subscription2 = Meteor.subscribe('Spots');
  return {
    ready: subscription.ready() && subscription2.ready(),
  };
})(UserFile);
