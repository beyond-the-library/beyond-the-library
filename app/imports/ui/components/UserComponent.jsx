import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserComponent extends React.Component {
  render() {
    return (
        <Card centered>
          <Image src={this.props.user.image} wrapped ui={false}/>
          <Card.Header>{this.props.user.username}</Card.Header>
          <Card.Meta>{this.props.user.major}</Card.Meta>
          <Card.Description>
            {this.props.user.description}
          </Card.Description>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
UserComponent.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserComponent);
