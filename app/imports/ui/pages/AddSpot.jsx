import React from 'react';
import { Card, Container, Grid, Image, Header, Button } from 'semantic-ui-react';

class AddSpot extends React.Component {
  render() {
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Card.Group>
            <Card fluid color='red' height='200px'>
              <Card.Content>
              <Grid container>
                <Grid.Column width={3}>
                  <Image verticalAlign='middle' fluid rounded
                      src="https://cnet3.cbsistatic.com/img/pXZLKD-YlCz9n12JlGhovk4YCdo=/1092x0/2014/03/31/1497f64b-bf2d-11e3-bddd-d4ae52e62bcc/bliss_1.jpg"/>
                </Grid.Column>
                <Grid.Column width={9}>
                  <Header as='h5'>Location: Somewhere in the earth</Header>
                  <Header as='h5'>Description: Everyone knows this spot.</Header>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Button.Group>
                    <Button positive>Edit</Button>
                    <Button.Or />
                    <Button negative>Discard</Button>

                  </Button.Group>
                </Grid.Column>
              </Grid>
              </Card.Content>
            </Card>
            <Card fluid color='orange' header='Option 2'/>
            <Card fluid color='yellow' header='Option 3'/>
          </Card.Group>
        </Container>

    );
  }
}

export default AddSpot;
