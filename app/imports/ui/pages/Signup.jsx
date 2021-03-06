import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Image } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Users } from '/imports/api/user/Users';
import swal from 'sweetalert';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    const username = email;
    const image = 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';
    const description = 'Say something to introduce yourself';
    const major = 'Art';
    const favoriteSpot = 'Paradise Palms';
    Accounts.createUser({ email, username, password, image, description, major, favoriteSpot }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Users.insert({ email, password, username, image, description, major, favoriteSpot },
            (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                swal('Welcome', 'Now you can leave comments and contribute your study spots', 'success');
                this.setState({ error: '', redirectToReferer: true });
              }
            });
      }
    });
  }

  /** Display the signup form. Redirect to landing page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container>
        <Image centered circular size='medium' src='/images/logo-temp.png'/>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
