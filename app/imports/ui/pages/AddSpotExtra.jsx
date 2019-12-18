import React from 'react';
import SimpleSchema from 'simpl-schema';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Spots } from '/imports/api/spot/Spots';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import ReactTooltip from 'react-tooltip';
import { Redirect } from 'react-router-dom';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  image: String, // a link to the picture of the spot
  major: {
    type: String,
    allowedValues: ['Computer Science', 'Computer Engineering', 'Music', 'Open for everyone'],
    defaultValue: 'Open for everyone',
  },
  environment: {
    type: String,
    allowedValues: ['Indoor', 'Outdoor', 'Unknown'],
    defaultValue: 'Outdoor',
  },
  time: {
    type: String,
    allowedValues: ['24/7', 'Weekdays Daytime', 'Daytime', 'Unknown'],
    defaultValue: '24/7',
  },
});

/** Renders the Page for adding a document. */
class AddSpotExtra extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToMySpots: false,
    };
  }

  /** On submit, insert the data. */
  submit(data) {
    const { image, major, environment, time, _id } = data;
    Spots.update(_id, {
          $set: {
            image,
            major,
            environment,
            time,
            status: 'Pending',
          },
        }, (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'More details have been submitted. Thank you!', 'success')
                .then(() => { this.setState({ redirectToMySpots: true }); });
          }
        });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const redirectToMySpots = this.state.redirectToMySpots;
    if (redirectToMySpots === true) {
      return <Redirect to='/myspots'/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Extra Information</Header>
            <AutoForm schema={formSchema} onSubmit={data => this.submit(data)} model={this.props.spot}>
              <Segment>
                {/* eslint-disable-next-line max-len */}
                <TextField name='image' data-tip="An url link to the image file of the spot. Check FAQ for more information."/>
                <SelectField name='major' data-tip="If there is any major restrictions"/>
                <SelectField name='environment' data-tip="Some spots are indoor, some are not"/>
                <SelectField name='time' data-tip="When is your spot available?"/>
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
AddSpotExtra.propTypes = {
  spot: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Spots');
  return {
    spot: Spots.findOne(documentId),
    ready: subscription.ready(),
  };
})(AddSpotExtra);
