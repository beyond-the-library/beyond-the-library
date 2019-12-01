import React from 'react';
import SimpleSchema from 'simpl-schema';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import LongTextField from 'uniforms-semantic/LongTextField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Spots } from '/imports/api/spot/Spots';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String, // name of the spot
  image: String, // a link to the picture of the spot
  location: String, // general location for display
  description: String, // extra information for display
  address: String, // this is the exact address for map interaction
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
    const { name, image, location, description, address, major, environment, time } = data;
    const owner = Meteor.user().username;
    const status = 'Pending';
    Spots.insert({ name, image, location, description, address, status, owner, major, environment, time },
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
                <TextField name='name'/>
                <TextField name='image'/>
                <TextField name='location'/>
                <LongTextField name='description'/>
                <TextField name='address'/>
                <SelectField name='major'/>
                <SelectField name='environment'/>
                <SelectField name='time'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddSpot;
