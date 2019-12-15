import React from 'react';
import SimpleSchema from 'simpl-schema';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import NumField from 'uniforms-semantic/NumField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Spots } from '/imports/api/spot/Spots';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import ReactTooltip from 'react-tooltip';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  image: String, // a link to the picture of the spot
  latitude: {
    type: Number,
    defaultValue: 21.2969,
  },
  longitude: {
    type: Number,
    defaultValue: -157.8171,
  },
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

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { image, latitude, longitude, major, environment, time } = data;
    const owner = Meteor.user().username;
    const status = 'Pending';
    const name = this.state.spot.name;
    const location = this.state.spot.location;
    const description = this.state.spot.description;
    Spots.insert({ name, image, location, description, status, latitude, longitude, owner, major, environment, time },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Spot added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Extra</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                {/* eslint-disable-next-line max-len */}
                <TextField name='image' data-tip="An url link to the image file of the spot. You may want to try https://imgbb.com/ "/>
                {/* eslint-disable-next-line max-len */}
                <NumField name='latitude' data-tip="The Latitude of GPS Coordinates. Please use defalt value if you are not sure."/>
                {/* eslint-disable-next-line max-len */}
                <NumField name='longitude' data-tip="The Longitude of GPS Coordinates. Please use defalt value if you are not sure."/>
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
