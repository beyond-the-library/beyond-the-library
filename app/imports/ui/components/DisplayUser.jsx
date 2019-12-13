import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class DisplayUser extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image
                floated='right'
                size='large'
                src={this.props.user.image}
            />
            <Card.Header>{this.props.user.username}</Card.Header>
            <Card.Meta>{this.props.user.email}</Card.Meta>
            <Card.Meta>{this.props.user.major}</Card.Meta>
            <Card.Description>
              {this.props.user.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            Favorite Spot: {this.props.user.favoriteSpot}
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
DisplayUser.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(DisplayUser);
