import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import CarouselFooter from '../components/CarouselFooter';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <Grid verticalAlign='middle' textAlign='center'
                style={{
                  height: '950px',
                  backgroundSize: 'cover',
                  backgroundImage: `url(${'images/beach.png'})`,
                  backgroundRepeat: 'no-repeat',
                }}>
            <Grid.Column>
              <Container>
                <h1 style={{
                  fontSize: '120px',
                  color: 'white',
                }}>Beyond the Library</h1>
                <p id='landingtexts' style={{
                  color: 'white',
                  fontSize: '40px',
                }}
                >Hit the books in these hit places</p>
              </Container>
            </Grid.Column>
          </Grid>
          <CarouselFooter/>
        </div>
    );
  }
}

export default Landing;
