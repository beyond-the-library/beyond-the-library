import React from 'react';
import { Accordion, Icon, Grid, Image, List, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class FAQ extends React.Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    return (
        <Grid container style={{ paddingTop: '25px' }}>
          <Header as='h1'>Frequently Asked Questions (FAQ) About Beyond the Library</Header>
          <Accordion fluid styled>
            <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
            >
              <Icon name='dropdown'/>
              What is Beyond the Library?
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <p>
                Beyond the Library is a web application where UH students can discover and share study spots.
              </p>
            </Accordion.Content>

            <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={this.handleClick}
            >
              <Icon name='dropdown'/>
              How do I log in or sign up?
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <List as='ul'>
                <List.Item as='li'>
                  Click on the person icon in the upper right-hand corner of the site.
                  <List.List>
                    <List.Item as='li'>If you do not have an account or would like to create a new account, click
                      the &quot;
                      sign up&quot; option.</List.Item>
                    <List.Item as='li'>If you already have an account, click the &quot;sign in&quot; option.</List.Item>
                  </List.List></List.Item>
              </List>
            </Accordion.Content>

            <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={this.handleClick}
            >
              <Icon name='dropdown'/>
              How do I find the image url?
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <List ordered animated>
                <List.Item>Search on your own image hosting service (i.e. Google Photos) or search the internet
                  for the location image (i.e. Google Images).</List.Item>
                <List.Item>Right click on the image.</List.Item>
                <List.Item>Select the &quot;Copy image address&quot; option.</List.Item>
                <List.Item>Now the image is copied to your clipboard and can be pasted into the form.</List.Item>
              </List>
            </Accordion.Content>

            <Accordion.Title
                active={activeIndex === 3}
                index={3}
                onClick={this.handleClick}
            >
              <Icon name='dropdown'/>
              How do I find a location&apos;s geo coordinates?
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 3}>
              <p>This information is necessary to place your study spot on the map.</p>
              <List ordered animated>
                <List.Item>Use Google Maps to find the location you want to add.</List.Item>
                <List.Item>Right click on the map.</List.Item>
                <List.Item>
                  Select the &quot;What&apos;s here?&quot; option.
                  <Image src='images/geo_1.png' className='imageFAQ'/>
                </List.Item>
                <List.Item>
                  Click on the pop up on the bottom of the map.
                  <Image src='images/geo_2.png' className='imageFAQ'/>
                </List.Item>
                <List.Item>
                  There is a new side panel with two numbers.
                  <Image src='images/geo_3.png' className='imageFAQ'/>
                </List.Item>
                <List.Item>The first number is the latitude.</List.Item>
                <List.Item>The second number is the longitude.</List.Item>
              </List>
            </Accordion.Content>
          </Accordion>
        </Grid>
    );
  }
}

export default FAQ;
