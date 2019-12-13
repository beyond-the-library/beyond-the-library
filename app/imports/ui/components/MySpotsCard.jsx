import React from 'react';
import { Card, Image, Grid, Header, Label, Icon, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Spots } from '../../api/spot/Spots';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MySpotsCard extends React.Component {
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

  delete = () => {
    swal({
      title: 'Wait a minute...',
      text: 'Out spot manager is on the way to see your awesome spot! Once discarded, you cannot recover this spot!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            Spots.remove(this.props.spot._id);
            swal('Poof! Now nobody can see your secret spot!', {
              icon: 'success',
            });
          } else {
            swal('Your spot is safe now!');
          }
        });
  }

  button() {
    if (this.props.spot.status !== 'Published') {
      return (
          <Button.Group>
            <Link to={`/edit/${this.props.spot._id}`}>
              <Button color='blue'>Edit</Button>
            </Link>
            <Button.Or/>
            <Button negative onClick={ this.delete }>Discard</Button>
          </Button.Group>
      );
    }
    return (
        <Header as='h4'>Thank you for the contribution to our community!</Header>
    );
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
              </Grid.Column>
              <Grid.Column width={4} rows='2' stretched>
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
MySpotsCard.propTypes = {
  spot: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MySpotsCard);
