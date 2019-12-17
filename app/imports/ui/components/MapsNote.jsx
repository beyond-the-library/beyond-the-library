import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class MapsNote extends React.Component {
  render() {
    return (
        <Feed.Event text-align='center'>
          <Feed.Content>
            <Feed.Date><b>Date posted: {this.props.note.createdAt.toLocaleDateString('en-US')}</b></Feed.Date>
            <Feed.User>Author: {this.props.note.owner }</Feed.User>
            <Feed.Summary>
              Message: {this.props.note.note}
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
