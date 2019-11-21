import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
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
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <Grid columns={3} divided>
            <Grid.Column>
              <div style={divStyle} className="ui center aligned container">
                <hr/>
                About <br/>
                of the UH community.<br/>
                Honolulu, HI 96822 <br/>
                <a href="https://beyond-the-library.github.io/">About Page</a>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div style={divStyle} className="ui center aligned container">
                <hr/>
                About <br/>
                This web application allows students at UH Manoa to find and contribute new study spots for the benefit
                of the UH community.<br/>
                Honolulu, HI 96822 <br/>
                <a href="https://beyond-the-library.github.io/#user-guide">User Guide</a>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div style={divStyle} className="ui center aligned container">
                <hr/>
                <Carousel elements={ elements }
                          duration = {3000}
                          animation = 'slide left'
                          showNextPrev = {false}
                          showIndicatrs = {false}/>
              </div>
            </Grid.Column>
          </Grid>
        </footer>
    );
  }
}

export default CarouselFooter;
