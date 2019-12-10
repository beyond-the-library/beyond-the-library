import React from 'react';
import { Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div style={{
          height: '800px',
          backgroundSize: 'cover',
          backgroundImage: `url(${'images/beach.png'})`,
          backgroundRepeat: 'no-repeat',
        }}>
            <Grid container verticalAlign="middle" textAlign='center' style={{ paddingTop: '100px' }}>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <h1 className='landingTitle' style={{
                    fontSize: '140px',
                    color: 'white',
                  }}>Beyond the Library</h1>
                </Grid.Column>
                <Grid.Column>
                  <p className='landingTitle' style={{
                    color: 'white',
                    fontSize: '40px',
                  }}
                     // eslint-disable-next-line max-len
                  >Discover new study spots! Login or register in the upper right-hand corner to get started. If you&apos;re lost, visit the
                    Frequently Asked Questions (FAQ) page via the top menu.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
        </div>
    );
  }
}

export default Landing;
