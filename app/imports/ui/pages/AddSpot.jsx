import React from 'react';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Segment, Header, Button } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import LongTextField from 'uniforms-semantic/LongTextField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Spots } from '/imports/api/spot/Spots';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import ReactTooltip from 'react-tooltip';
import { Link, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String, // name of the spot
  location: String, // general location for display
  description: String, // extra information for display
});

/** Renders the Page for adding a document. */
class AddSpot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToMySpots: false,
      redirectToNext: false,
    };
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, location, description, major, environment, time } = data;
    const owner = Meteor.user().username;
    const status = 'Pending';
    const image = 'images/logo-temp.png';
    const latitude = 21.2969;
    const longitude = -157.8171;
    Spots.insert({ name, image, location, description, status, latitude, longitude, owner, major, environment, time },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal({
              title: 'Success',
              text: 'Would you like to add more details to this spot?',
              icon: 'success',
              buttons: {
                willContinue: 'Why not?',
                cancel: 'Maybe Later...',
              },
            })
                .then((value) => {
                  switch (value) {

                    case 'willContinue':
                      this.setState({ redirectToNext: true });
                      break;

                    default:
                      this.setState({ redirectToMySpots: true });
                  }
                });
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    const redirectToMySpots = this.state.redirectToMySpots;
    const redirectToNext = this.state.redirectToNext;
    if (redirectToMySpots === true) {
      return <Redirect to="/myspots" />;
    }
    if (redirectToNext === true) {
      return <Redirect to="/discovery" />;
    }
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add a Spot</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField name='name' data-tip="The name of the study spot"/>
                <TextField name='location' data-tip="Where is the study spot?"/>
                <LongTextField name='description' data-tip="You can add some extra description or information here"/>
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

AddSpot.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Spots');
  return {
    doc: Spots.findOne(documentId),
    ready: subscription.ready(),
  };
})(AddSpot);
