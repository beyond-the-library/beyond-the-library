import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Container, Form, Segment, Image } from 'semantic-ui-react';
import swal from 'sweetalert';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class EditPassword extends React.Component {
  state = { currPass: '', newPass: '', renewPass: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handlePassChange = () => {
    const { currPass, newPass, renewPass } = this.state;
    if (newPass !== renewPass) {
      swal({
        title: 'Error!',
        text: '"Type New password" and "Retype New Password" fields do not match. They must be the same.',
        icon: 'warning',
        buttons: { cancel: 'OK' },
      });
    } else {
      Accounts.changePassword(currPass, newPass, (error) => {
        if (error === undefined) {
          swal({
            title: 'Success!',
            text: 'Password changed successfully!',
            icon: 'success',
            buttons: { cancel: 'OK' },
          });
        } else {
          swal({
            title: 'Error!',
            text: '"Type Current password" field and current password do not match.',
            icon: 'warning',
            buttons: { cancel: 'OK' },
          });
        }
      });
    }
  }

  render() {
    const { currPass, newPass, renewPass } = this.state;
    return (
        <Container>
          <Image centered size='medium' src='/images/logo-temp.png'/>
          <Form onSubmit={this.handlePassChange}>
            <Segment stacked>
              <Form.Input
                  label='Type Current Password'
                  name='currPass'
                  value={currPass}
                  onChange={this.handleChange}
              />
              <Form.Input
                  label='Type New Password'
                  name='newPass'
                  value={newPass}
                  onChange={this.handleChange}
              />
              <Form.Input
                  label='Retype New Password'
                  name='renewPass'
                  value={renewPass}
                  onChange={this.handleChange}
              />
              <Form.Button content='Submit'/>
            </Segment>
          </Form>
        </Container>
    );
  }
}
