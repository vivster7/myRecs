import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import flow from 'lodash/flow';
import Release from './Release';
import Shelf from './Shelf';
import Header from './Header';
import Button from './Button';
import Trash from './Trash';
import { addShelf, fetchRecords } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleAddShelf = this.handleAddShelf.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchRecords());
  }

  handleFetchRecords(e) {
    e.preventDefault();
  }

  handleAddShelf(e) {
    this.props.dispatch(addShelf());
    e.preventDefault();
  }

  renderRelease(release) {
    return <Release release={release} key={release.id} />;
  }

  renderShelf(shelf) {
    const { releases } = this.props;
    const releaseIds = Object.keys(releases).filter((id) => 
      releases[id].shelf === shelf.id
    )
    
    return (
      <Shelf shelf={shelf} key={shelf.id}>
        {releaseIds.map((id) => 
          this.renderRelease(releases[id]))}
      </Shelf>
    );
  }

  render() {

    const { shelves, releases } = this.props;

    const shelvesComponents = Object.keys(shelves).map((shelf) =>
      this.renderShelf(shelves[shelf])
    );

    if (Object.keys(releases).length === 0) {
      return (
        <Header>
          <div>Loading Records for user...</div>
        </Header>
      );
    }

    return (
      <div style={{fontFamily: 'sans-serif'}}>
        <Header />
        {shelvesComponents}
        <Button action={this.handleAddShelf} />
        <Trash />
      </div>
    )
  }
}

App.propTypes = {
  shelves: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { shelves, releases } = state;
  return { shelves, releases }
}

export default flow(
  connect(mapStateToProps),
  DragDropContext(HTML5Backend)
)(App);