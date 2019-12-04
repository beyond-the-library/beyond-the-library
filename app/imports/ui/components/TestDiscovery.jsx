import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TestDiscovery extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image
                floated='center'
                size='medium'
                src={this.props.spot.image}
            />
            <Card.Header>{this.props.spot.name}</Card.Header>
            <Card.Meta>{this.props.spot.location}</Card.Meta>
            <Card.Description>
              {this.props.spot.description}
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
TestDiscovery.propTypes = {
  spot: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(TestDiscovery);
