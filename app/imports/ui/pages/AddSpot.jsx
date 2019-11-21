import React from 'react';
import { Card, Container, Grid, Image, Header, Button, Label, Icon } from 'semantic-ui-react';

class AddSpot extends React.Component {
  render() {
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Card.Group>
            <Card fluid color='orange' height='200px'>
              <Card.Content>
              <Grid container>
                <Grid.Column width={3}>
                  <Image verticalAlign='middle' fluid rounded
                      src="https://cnet3.cbsistatic.com/img/pXZLKD-YlCz9n12JlGhovk4YCdo=/1092x0/2014/03/31/1497f64b-bf2d-11e3-bddd-d4ae52e62bcc/bliss_1.jpg"/>
                </Grid.Column>
                <Grid.Column width={9}>
                  <Header as='h4'>Location: Somewhere in the earth</Header>
                  <Header as='h4'>Description: Everyone knows this spot.</Header>
                </Grid.Column>
                <Grid.Column width={3} rows='2' stretched>
                  <Grid.Row>
                    <Label size='large'>
                      <Icon name='circle outline' color='orange' /> Pending
                    </Label>
                  </Grid.Row>
                  <Grid.Row>
                    <Button.Group>
                      <Button positive>Edit</Button>
                      <Button.Or />
                      <Button negative>Discard</Button>
                    </Button.Group>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
              </Card.Content>
            </Card>


            <Card fluid color='green' height='200px'>
              <Card.Content>
                <Grid container>
                  <Grid.Column width={3}>
                    <Image verticalAlign='middle' fluid rounded
                           src="https://cnet3.cbsistatic.com/img/pXZLKD-YlCz9n12JlGhovk4YCdo=/1092x0/2014/03/31/1497f64b-bf2d-11e3-bddd-d4ae52e62bcc/bliss_1.jpg"/>
                  </Grid.Column>
                  <Grid.Column width={9}>
                    <Header as='h4'>Location: Somewhere in the earth</Header>
                    <Header as='h4'>Description: Everyone knows this spot.</Header>
                  </Grid.Column>
                  <Grid.Column width={3} rows='2' stretched>
                    <Grid.Row>
                      <Label size='large'>
                        <Icon name='circle outline' color='green' /> Approved
                      </Label>
                    </Grid.Row>
                  </Grid.Column>
                </Grid>
              </Card.Content>
            </Card>
          </Card.Group>
        </Container>

    );
  }
}

export default AddSpot;
