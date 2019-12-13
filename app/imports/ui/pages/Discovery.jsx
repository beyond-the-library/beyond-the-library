import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Dropdown, Menu, Card, Button, Loader } from 'semantic-ui-react';
import SpotCard from '/imports/ui/components/SpotCard.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { Spots } from '../../api/spot/Spots.js';
import { Notes } from '../../api/note/Notes';

/** {this.props.spots.map((spot, index) => <SpotCard key={index} spot={spot}/>)} */
/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Discovery extends React.Component {

  state = {
    spots: [],
    searchBy: '',
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
      { key: 1, value: 'environment', text: 'Environment' },
      { key: 2, value: 'location', text: 'Location' },
      { key: 3, value: 'name', text: 'Name' },
      { key: 4, value: 'owner', text: 'Posts by User' },
      { key: 5, value: 'time', text: 'Time' },
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
    this.setState({ searchBy: '' });
    this.setState({ currentValue: [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active> Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    if (this.spots === undefined) {
      this.createOptions();
    }
    return (
        <Container>
          <Header as="h2" textAlign="center">Discover New Spots</Header>
          <Container text textAlign={'center'}>
            Discover new study spots here! Choose a filter and a sub-filter, and see all available results (or do not).
            Find a spot you want and search for it on the map page.
          </Container>
          <Menu>
            <Dropdown placeholder={'Choose a Filter...'} selection options={this.searchBy}
                      onChange={(e, data) => this.setSearchBy(e, data)}/>
            <Dropdown placeholder={'Choose a sub-filter...'} deburr fluid search selection
                      options={this[this.state.searchBy]} icon='search' allowAdditions additionLabel=''
                      onChange={(event, data) => this.handleGeneralChange(event, data, this.state.searchBy)}
                      onAddItem={(e, data) => this.handleAddition(e, data, this.state.searchBy)}/>
            <Button negative onClick={this.onClickClear}>Clear</Button>
          </Menu>
          <Card.Group>
            {this.state.spots.length === 0 ? (
                // eslint-disable-next-line max-len
                this.props.spots.map((spot, index) => <SpotCard key={index} spot={spot} notes={this.props.notes.filter(note => (note.contactId === spot._id))}/>)
            ) : (
                // eslint-disable-next-line max-len
                this.state.spots.map((spot, index) => <SpotCard key={index} spot={this.returnSpot(spot._id)} notes={this.props.notes.filter(note => (note.contactId === spot._id))}/>))
            }
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Discovery.propTypes = {
  spots: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Spots documents.
  const subs1 = Meteor.subscribe('Spots');
  const subs2 = Meteor.subscribe('Notes');
  return {
    spots: Spots.find({ status: 'Published' }).fetch(),
    notes: Notes.find({}).fetch(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
    ready: subs1.ready() && subs2.ready(),
  };
})(Discovery);
