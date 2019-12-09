import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import LongTextField from 'uniforms-semantic/LongTextField'; // required for Uniforms
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Spots, SpotsSchema } from '../../api/spot/Spots';
import 'uniforms-bridge-simple-schema-2';

/** Renders the Page for editing a single document. */
class EditSpot extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, image, location, description, address, major, environment, time, _id } = data;
    // eslint-disable-next-line max-len
    Spots.update(_id, {
      $set: {
        name,
        image,
        location,
        description,
        address,
        major,
        environment,
        time,
        status: 'Pending',
      },
    }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Spot updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Spot</Header>
            <AutoForm schema={SpotsSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
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
                <HiddenField name='owner'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditSpot.propTypes = {
  doc: PropTypes.object,
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
    doc: Spots.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditSpot);
