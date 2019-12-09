import React from 'react';
import { Card, Image, Grid, Header, Label, Icon, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Spots } from '../../api/spot/Spots';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AllSpotsCard extends React.Component {
  publish = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once you publish the spot, everyone can see this spot.',
      icon: 'warning',
      buttons: true,
    })
        .then((willPublish) => {
          if (willPublish) {
            Spots.update(this.props.spot._id, {
              $set: { status: 'Published' },
            });
            swal('The spot has been published.', {
              icon: 'success',
            });
          }
        });


  }

  reject = () => {
    swal({
      title: 'Are you sure?',
      text: 'You cannot do anything to this spot until the user resubmit the spot.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willReject) => {
          if (willReject) {
            Spots.update(this.props.spot._id, {
              $set: { status: 'Rejected' },
            });
            swal('The spot has been rejected.', {
              icon: 'success',
            });
          }
        });

  }

  archive = () => {
    Spots.update(this.props.spot._id, {
      $set: { status: 'Archived' },
    });
  }

  delete = () => {
    swal({
      title: 'Are you sure?',
      text: 'The spot cannot be retrieved once deleted.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            Spots.remove(this.props.spot._id);
            swal('The spot has been removed.', {
              icon: 'success',
            });
          }
        });
  }

  icon() {
    if (this.props.spot.status === 'Pending') {
      return (<Icon name='circle outline' color='orange'/>);
    }
    if (this.props.spot.status === 'Published') {
      return (<Icon name='check' color='green'/>);
    }
    if (this.props.spot.status === 'Rejected') {
      return (<Icon name='reply' color='red'/>);
    }
    return (<Icon name='archive' color='grey'/>);
  }

  button() {
    if (this.props.spot.status === 'Pending') {
      return (
          <Button.Group>
            <Link to={`/edit/${this.props.spot._id}`}>
              <Button color='blue'>Edit</Button>
            </Link>
            <Button.Or/>
            <Button negative onClick={this.reject}>Reject</Button>
            <Button.Or/>
            <Button positive onClick={this.publish}>Publish</Button>
          </Button.Group>
      );
    }
    if (this.props.spot.status === 'Published') {
      return (
          <Button.Group>
            <Link to={`/edit/${this.props.spot._id}`}>
              <Button color='blue'>Edit</Button>
            </Link>
            <Button.Or/>
            <Button negative onClick={this.delete}>Delete</Button>
            <Button.Or/>
            <Button color='grey' onClick={this.archive}>Archive</Button>
          </Button.Group>
      );
    }
    if (this.props.spot.status === 'Archived') {
      return (
          <Button.Group>
            <Link to={`/edit/${this.props.spot._id}`}>
              <Button color='blue'>Edit</Button>
            </Link>
            <Button.Or/>
            <Button negative onClick={this.delete}>Delete</Button>
            <Button.Or/>
            <Button positive onClick={this.publish}>Publish</Button>
          </Button.Group>
      );
    }
    return (<Header as='h4'>Waiting for User</Header>);
  }

  render() {
    return (
        <Card fluid height='200px' centered>
          <Card.Content>
            <Grid container>
              <Grid.Column width={3}>
                <Image verticalAlign='middle' fluid rounded centered
                       src={this.props.spot.image}/>
              </Grid.Column>
              <Grid.Column width={9}>
                <Header as='h3'>{this.props.spot.name}</Header>
                <Header as='h4'>Location: {this.props.spot.location}</Header>
                <Header as='h4'>Description: {this.props.spot.description}</Header>
                <Header as='h4'>Owner: {this.props.spot.owner}</Header>
              </Grid.Column>
              <Grid.Column width={3} rows='2' stretched>
                <Grid.Row>
                  <Label size='large'>
                    {this.icon()}
                    {this.props.spot.status}
                  </Label>
                </Grid.Row>
                <Grid.Row>
                  {this.button()}
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
AllSpotsCard.propTypes = {
  spot: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(AllSpotsCard);
