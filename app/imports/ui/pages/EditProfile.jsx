import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import LongTextField from 'uniforms-semantic/LongTextField'; // required for Uniforms
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2';
import ReactTooltip from 'react-tooltip';
import { Users, UsersSchema } from '../../api/user/Users';

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToProfile: false,
    };
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { username, image, description, major, favoriteSpot, _id } = data;
    Users.update(_id, {
      $set: {
        username, image, description, major, favoriteSpot,
      },
    }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Profile updated successfully', 'success'))
        .then(() => { this.setState({ redirectToMySpots: true }); }));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const redirectToProfile = this.state.redirectToProfile;
    if (redirectToProfile === true) {
      return <Redirect to='/userfile'/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Profile</Header>
            <AutoForm schema={UsersSchema} onSubmit={data => this.submit(data)} model={this.props.user}>
              <Segment>
                <TextField name='username' data-tip="Who are you?"/>
                {/* eslint-disable-next-line max-len */}
                <TextField name='image' data-tip="An url link to the image file of the spot. Check FAQ for more information."/>
                <LongTextField name='description' data-tip="Say something about yourself!"/>
                <TextField name='major' data-tip="What is your major?"/>
                <TextField name='favoriteSpot' data-tip="Tell us your favorite study spot!"/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <ReactTooltip />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  user: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Users');
  return {
    user: Users.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditProfile);
