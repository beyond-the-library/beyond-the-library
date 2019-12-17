import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Segment, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { NavLink, Redirect } from 'react-router-dom';
import { Users } from '../../api/user/Users';
import DisplayUser from '../components/DisplayUser';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

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

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Card.Group>
            {this.props.users.map((user, index) => <DisplayUser key={index} user={user}/>)}
          </Card.Group>
          <Segment>
            <Button as={NavLink} exact to={'/editPassword'}> Change Password</Button>
            <Button onClick={this.deleteMessage}> Delete this account</Button>
          </Segment>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  users: PropTypes.array.isRequired,
  location: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  Meteor.subscribe('Users');
  return {
    users: Users.find({ username: Meteor.user() ? Meteor.user().username : '' }).fetch(),
  };
})(UserProfile);
