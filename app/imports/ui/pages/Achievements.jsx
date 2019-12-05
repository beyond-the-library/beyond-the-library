import React from 'react';
import { Card } from 'semantic-ui-react';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Achievements extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Card.Group centered={true}>
          <Card
              color='red'
              image='images/trophy-bronze.png'
              header='Taking Flight'
              meta='Achievement #1'
              description='You added one favorite!'
          />
          <Card
              color='orange'
              image='images/trophy-silver.png'
              header='Go Getter'
              meta='Achievement #2'
              description='You added three favorites!'
          />
          <Card
              color='yellow'
              image='images/trophy.png'
              header='On Fire'
              meta='Achievement #3'
              description='You added five favorites!'
          />
        </Card.Group>
    );
  }
}

export default Achievements;
