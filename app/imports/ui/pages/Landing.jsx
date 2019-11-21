import React from 'react';
import { Grid } from 'semantic-ui-react';
// import CarouselFooter from '../components/CarouselFooter';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <Grid verticalAlign='middle' textAlign='center'
                style={{
                  height: 400,
                  backgroundSize: 'cover',
                  backgroundImage: `url(${'images/landingmain.jpg'})`,
                }}>
            <Grid.Column>
              <h1 style={{
                color: 'white',
              }}>Beyond the Library</h1>
              <p style={{
                color: 'white',
              }}
              >Hit the books in these hit places</p>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
