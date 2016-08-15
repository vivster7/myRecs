import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import flow from 'lodash/flow';
import Shelf from './Shelf';
import { moveRelease } from './actions';

class App extends Component {

  // THIS IS MANAGING STATE!
  // moveTitle(title, source, destination) {
  //   const idx = 
  // }

  renderShelf(shelf) {
    const { key, name, releases } = shelf;
    console.log(shelf); 
    return <Shelf key={key} name={name} onShelf={releases} />
  }

  render() {

    const { shelves } = this.props;

    const shelvesComponents = Object.keys(shelves).map((shelf) =>
      this.renderShelf(shelves[shelf])
    );

    return (
      <div style={{
      }}>
        {shelvesComponents}
      </div>
    )
  }
}

App.propTypes = {
  shelves: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  window.s = state;
  const { shelves } = state;
  return { shelves }
}

export default flow(
  connect(mapStateToProps),
  DragDropContext(HTML5Backend)
)(App);