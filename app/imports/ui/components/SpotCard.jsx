import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Feed, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import MapsNote from '/imports/ui/components/MapsNote';
import AddNote from '/imports/ui/components/AddNote.jsx';
import ReactTooltip from 'react-tooltip';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SpotCard extends React.Component {
  render() {
    return (
        <Card text-align='center'>
          <ReactTooltip />
          <Link to={`/location/${this.props.spot._id}`}>
            {/* eslint-disable-next-line max-len */}
            <Image src={this.props.spot.image} style={{ width: '300px', height: '300px' }} data-tip={this.props.spot.location}/>
          </Link>
            {/* eslint-disable-next-line max-len */}
          <Card.Header text-align="center" as='h4'> {this.props.spot.name} </Card.Header>
          <Card.Description> {this.props.spot.description} </Card.Description>
          <Card.Content extra>
            <Feed text-align="center">
              <hr/>
              {this.props.notes.map((note, index) => <MapsNote key={index} note={note}/>)}
            </Feed>
          </Card.Content>
          {this.props.currentUser ? (
              <Card.Content extra>
                <Container>
                  <hr/>
                  <AddNote owner={this.props.spot.owner} contactId={this.props.spot._id}/>
                </Container>
              </Card.Content>
          ) : ''}

        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
SpotCard.propTypes = {
  spot: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
  currentUser: PropTypes.string,
  location: PropTypes.object,

};

const SpotCardContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(SpotCard);
/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SpotCardContainer);
