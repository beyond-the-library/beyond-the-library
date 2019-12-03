import React from 'react';
import { Grid, Image, Container } from 'semantic-ui-react';
import Carousel from 'semantic-ui-carousel-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class CarouselFooter extends React.Component {
  render() {
    const elements = [
      {
        render: () => <Image centered src='images/testspot1.jpeg'/>,
      },
      {
        render: () => <Image centered src='images/testspot2.jpeg'/>,
      },
      {
        render: () => <Image centered src='images/testspot3.jpeg'/>,
      },
    ];
    return (
        <footer>
          <Grid columns={3} divided>
            <Grid.Column>
              <Container textAlign='center'>
                <hr/>
                <h3>About</h3>
                <p>We want to enable students to share their experiences and discoveries of spots where they have
                  studied in.</p>
                <p><a href="https://beyond-the-library.github.io/">About Page</a></p>
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Container textAlign='center'>
                <hr/>
                <h3>Sign up</h3>
                <p>Signing up allows you to contribute and save certain spots for ease of access.</p>
                <p>Committed to community contribution.</p>
                <p><a href="https://beyond-the-library.github.io/#user-guide">User Guide</a></p>
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Container>
                <hr/>
                <Carousel elements={elements} duration={10000} animation='slide left' showNextPrev={false}
                          showIndicators={false}/>
              </Container>
            </Grid.Column>
          </Grid>
        </footer>
    );
  }
}

export default CarouselFooter;
