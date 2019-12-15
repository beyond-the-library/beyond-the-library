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
import 'uniforms-bridge-simple-schema-2';
import NumField from 'uniforms-semantic/NumField';
import ReactTooltip from 'react-tooltip';
import { Spots, SpotsSchema } from '../../api/spot/Spots';

/** Renders the Page for editing a single document. */
class EditSpot extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, image, location, description, latitude, longitude, major, environment, time, _id } = data;
    // eslint-disable-next-line max-len
    Spots.update(_id, {
      $set: {
        name,
        image,
        location,
        description,
        latitude,
        longitude,
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
            <AutoForm schema={SpotsSchema} onSubmit={data => this.submit(data)} model={this.props.spot}>
              <Segment>
                <TextField name='name' data-tip="The name of the study spot"/>
                {/* eslint-disable-next-line max-len */}
                <TextField name='image' data-tip="An url link to the image file of the spot. You may want to try https://imgbb.com/ "/>
                <TextField name='location' data-tip="General location for display"/>
                <LongTextField name='description' data-tip="You can add some extra description or information here"/>
                {/* eslint-disable-next-line max-len */}
                <NumField name='latitude' data-tip="The Latitude of GPS Coordinates."/>
                {/* eslint-disable-next-line max-len */}
                <NumField name='longitude' data-tip="The Longitude of GPS Coordinates."/>
                <SelectField name='major' data-tip="If there is any major restrictions"/>
                <SelectField name='environment' data-tip="Some spots are indoor, some are not"/>
                <SelectField name='time' data-tip="When is your spot available?"/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <ReactTooltip />
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
})(EditSpot);
