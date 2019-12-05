import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Dropdown, Menu, Card, Button } from 'semantic-ui-react';
import SpotCard from '/imports/ui/components/SpotCard.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { Spots } from '../../api/spot/Spots.js';

/** {this.props.spots.map((spot, index) => <SpotCard key={index} spot={spot}/>)} */
/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Discovery extends React.Component {

  state = {
    spots: [],
    searchBy: 'Major',
    currentValue: [],
  };

  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleGeneralChange = this.handleGeneralChange.bind(this);
    this.createOptions = this.createOptions.bind(this);
    this.setSearchBy = this.setSearchBy.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.onClickClear = this.onClickClear.bind(this);
  }

  createOptions() {
    this.searchBy = [
      { key: 1, value: 'major', text: 'Major' },
      { key: 2, value: 'environment', text: 'Environment' },
      { key: 3, value: 'time', text: 'Time' },
      { key: 4, value: 'location', text: 'Location' },
    ];
    // eslint-disable-next-line no-restricted-syntax
    for (const category of this.searchBy) {
      const list = _.uniq(_.pluck(this.props.spots, category.value).flatten()).sort();
      this[category.value] = list.map((value, index) => ({ key: index, value: value, text: value }));
    }
  }

  returnSpot(spotId) {
    return Spots.findOne({ _id: spotId });
  }

  setSearchBy(event, data) {
    this.setState({ searchBy: data.value });
  }

  handleAddition(e, { value }, category) {
    const spots = this.props.spots.filter((x) => (x[category].toUpperCase().indexOf(value.toUpperCase()) !== -1));
    this.setState({ spots: spots });
  }

  handleGeneralChange(event, data, category) {
    const spots = this.props.spots.filter((x) => (x[category].toUpperCase().indexOf(data.value.toUpperCase()) !== -1));
    this.setState({ spots: spots });
  }

  handleFilterChange(event, data) {
    /* eslint-disable-next-line */
    const spots = this.props.spots.filter((x) => _.intersection(x.spots, data.value).length === data.value.length);
    this.setState({ spots: spots });
    this.setState({ currentValue: data.value });
  }

  onClickClear() {
    this.setState({ spots: [] });
    this.setState({ currentValue: [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.renderPage();
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    if (this.spots === undefined) {
      this.createOptions();
    }

    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Discover New Spots</Header>
          <Menu>
            <Dropdown selection defaultValue='Major' options={this.searchBy}
                      onChange={(e, data) => this.setSearchBy(e, data)}/>
            {this.state.searchBy === 'Major' ? (
                <Dropdown placeholder='Filter Values' fluid multiple search selection
                          options={this.spots} value={this.state.currentValue} icon='search'
                          onChange={(event, data) => this.handleFilterChange(event, data)}
                />
            ) : (
                <Dropdown placeholder={'Choose a Filter'} deburr fluid search selection
                          options={this[this.state.searchBy]} icon='search' allowAdditions additionLabel=''
                          onChange={(event, data) => this.handleGeneralChange(event, data, this.state.searchBy)}
                          onAddItem={(e, data) => this.handleAddition(e, data, this.state.searchBy)}
                />
            )}
            <Button negative onClick={this.onClickClear}>Clear</Button>
          </Menu>
          <Card.Group>
            {this.state.spots.length === 0 ? (
                this.props.spots.map((spot, index) => <SpotCard key={index} spot={spot}/>)
            ) : (
                this.state.spots.map((spot, index) => <SpotCard key={index} spot={this.returnSpot(spot._id)}/>))
            }
          </Card.Group>
          <Card.Content extra>
            <Button icon='file'/>
          </Card.Content>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Discovery.propTypes = {
  spots: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Spots documents.
  Meteor.subscribe('Spots');
  return {
    spots: Spots.find({}).fetch(),
  };
})(Discovery);
