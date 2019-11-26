import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import Carousel from 'semantic-ui-carousel-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
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
          <Grid columns={3}>
            <Grid.Column>
              <div style={divStyle} className="ui center aligned container">
                <hr/>
                About <br/>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <b>I can't find good places to study:</b> Beyond the Library helps students understand that libraries
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                aren't the end all be all when it comes to study locations. <br/>
                <a href="https://beyond-the-library.github.io/">About Page</a>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div style={divStyle} className="ui center aligned container">
                <hr/>
                <b>Sign up</b> <br/>
                Signing up allows you to discover, suggest study areas, update suggested spots and save your favorite
                study zones. <br/>
                <a href="https://beyond-the-library.github.io/#user-guide">User Guide</a>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div style={divStyle} className="ui center aligned container">
                <hr/>
                <Carousel elements={elements}
                          duration={3000}
                          animation='slide left'
                          showNextPrev={false}
                          showIndicatrs={false}/>
              </div>
            </Grid.Column>
          </Grid>
        </footer>
    );
  }
}

export default Footer;
