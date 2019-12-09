import React from 'react';
import { Header, Container, Grid, Form, Segment, Image } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class EditPassword extends React.Component {
  render() {
    return (
        <Container>
          <Image centered size='medium' src='/images/logo-temp.png'/>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Edit your Password
              </Header>
              <Form>
                <Segment stacked>
                  <Form.Input
                      label="New Password"
                      icon="lock"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="New Password"
                  />
                  <Form.Input
                      label="Retype New Password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="New Password"
                      type="password"
                  />
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}
