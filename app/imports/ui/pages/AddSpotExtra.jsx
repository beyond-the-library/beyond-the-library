import React from 'react';
import SimpleSchema from 'simpl-schema';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import LongTextField from 'uniforms-semantic/LongTextField';
import NumField from 'uniforms-semantic/NumField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Spots } from '/imports/api/spot/Spots';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import ReactTooltip from 'react-tooltip';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String, // name of the spot
  image: String, // a link to the picture of the spot
  location: String, // general location for display
  description: String, // extra information for display
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
class AddSpot extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, image, location, description, lat, lng, major, environment, time } = data;
    const owner = Meteor.user().username;
    const status = 'Pending';
    Spots.insert({ name, image, location, description, status, lat, lng, owner, major, environment, time },
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
            <Header as="h2" textAlign="center">Add a Spot</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField name='name' data-tip="The name of the study spot"/>
                {/* eslint-disable-next-line max-len */}
                <TextField name='image' data-tip="An url link to the image file of the spot. You may want to try https://imgbb.com/ "/>
                <TextField name='location' data-tip="General location for display"/>
                <LongTextField name='description' data-tip="You can add some extra description or information here"/>
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

export default AddSpot;
