import React from 'react';
import { Card, Image, Grid, Header, Label, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

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

  button() {
    if (this.props.spot.status !== 'Published') {
      return (
          <Button.Group>
            <Button color='blue' onClick={(e) => {
              e.preventDefault();
              console.log('edit');
            }}>Edit</Button>
            <Button.Or/>
            <Button negative>Discard</Button>
          </Button.Group>
      );
    }
    return (
        <Header as='h4'>You got 10 points from this spot!</Header>
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
          <Card.Content extra>
            <Link to={`/edit/${this.props.spot._id}`}>Edit</Link>
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
