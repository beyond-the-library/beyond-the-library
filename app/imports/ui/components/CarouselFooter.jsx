import React from 'react';
import { Grid, Image, Container } from 'semantic-ui-react';
import Carousel from 'semantic-ui-carousel-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class CarouselFooter extends React.Component {
  render() {
    const elements = [
      {
        render: () => <Image centered src='images/lecrepelawschool.jpg'/>,
      },
      {
        render: () => <Image centered src='images/marinesciencebuilding.jpg'/>,
      },
      {
        render: () => <Image centered src='images/pacifichurricanecenter.jpg'/>,
      },
      {
        render: () => <Image centered src='images/qlc.jpg'/>,
      },
      {
        render: () => <Image centered src='images/saundershall.jpg'/>,
      },
    ];
    return (
        <footer>
          <Grid columns={3} divided>
            <Grid.Column>
              <Container textAlign='center'>
                <hr/>
                <h2>About</h2>
                <p style={{ fontSize: '16px' }}>Are you sick of studying at the library? Do you want to discover
                  new study locations? Maybe a change in location can help you study better?Well you are in luck as
                  Beyond the Library helps you discover
                  study locations both on and off campus!</p>
                <p style={{ fontSize: '16px' }}><a href='https://beyond-the-library.github.io/#overview'>About Page
                </a></p>
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Container textAlign='center'>
                <hr/>
                <h2>Sign up</h2>
                <p style={{ fontSize: '16px' }}>Discovering new study spots doesn&apos;t require an account. However,
                  signing up allows you save your favorite study spots for easy access. It also allows you to propose
                  new study spots to be displayed on the site. Help improve the UH community by sharing your favorite
                  study spot!</p>
                <p style={{ fontSize: '16px' }}><a href='https://beyond-the-library.github.io/#user-guide'>User Guide
                </a></p>
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
