import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class MapsNote extends React.Component {
  render() {
    return (
        <Feed.Event >
          <Feed.Content>
            <Feed.Date content={this.props.note.createdAt.toLocaleDateString('en-US')} />
            <Feed.Summary>
              {this.props.note.note}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

MapsNote.propTypes = {
  note: PropTypes.object.isRequired,
};

export default withRouter(MapsNote);
