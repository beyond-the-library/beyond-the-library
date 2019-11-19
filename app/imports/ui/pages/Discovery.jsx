import React from 'react';
import { Container, Header, Form, Card, Image, Rating } from 'semantic-ui-react';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Discovery extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Discover New Spots</Header>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Major' placeholder='Major'/>
              <Form.Input fluid label='Name' placeholder='Name'/>
              <Form.Select
                  fluid
                  label='Location'
                  options={[{ key: 'onc', text: 'On Campus' }, { key: 'offc', text: 'Off Campus' }]}
                  placeholder='Location'
              />
              <Form.Select
                  fluid
                  label='Environment'
                  options={[{ key: 'i', text: 'Indoor' }, { key: 'o', text: 'Outdoor' }]}
                  placeholder='Environment'
              />
            </Form.Group>
            <Form.Button>Apply Filter</Form.Button>
          </Form>
          <Card.Group centered>
            <Card>
              <Image src='https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png' wrapped
                     ui={false}/>
              <Card.Content>
                <Card.Header>Name of Location</Card.Header>
                <Card.Meta>Hours of Operation</Card.Meta>
                <Card.Description>Description of Location</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Rating icon='star' defaultRating={3} maxRating={5}/>
              </Card.Content>
            </Card>
            <Card>
              <Image src='https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png' wrapped
                     ui={false}/>
              <Card.Content>
                <Card.Header>XP Hills</Card.Header>
                <Card.Meta>Anytime</Card.Meta>
                <Card.Description>It is somewhere on Earth, spacious, blissful</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Rating icon='star' defaultRating={5} maxRating={5}/>
              </Card.Content>
            </Card>
          </Card.Group>
        </Container>
    );
  }
}

export default Discovery;
