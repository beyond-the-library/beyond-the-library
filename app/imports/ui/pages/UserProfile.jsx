import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Container, Segment, Button, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { Users } from '../../api/user/Users';
import DisplayUser from '../components/DisplayUser';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  deleteMessage = () => {
    swal({
      title: 'Delete your account?',
      text: 'Any spots you published will not appear on the list unless added again. Proceed?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then(() => {
          const id = Users.find({ username: Meteor.user() ? Meteor.user().username : '' }).fetch();
          console.log(id);
          const userId = id._id;
          console.log(userId);
          // Meteor.logout();
          // Users.remove({ _id: id }, true);
          swal('Your account has been deleted.', {
            icon: 'success',
          });

        });
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    return <Redirect to={from}/>;
  }

  deleteMessage2 = () => {
    swal({
      title: 'Hey,',
      text: 'Delete functionality under construction.',
      icon: 'warning',
      buttons: true,
    });
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
            <DisplayUser user={this.props.user}/>
          </Card.Group>
          <Divider hidden/>
          <Segment>
            <Button as={NavLink} exact to={'/editPassword'}> Change Password</Button>
            <Button onClick={this.deleteMessage2}> Delete this account</Button>
            <Link to={`/editProfile/${this.props.user._id}`}>
              <Button color='blue'>Edit Profile</Button>
            </Link>
          </Segment>
          <Divider hidden/>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  Meteor.subscribe('Users');
  return {
    user: Users.findOne(),
  };
})(UserProfile);
