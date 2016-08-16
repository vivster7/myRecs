import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import Release from './Release';
import { ItemTypes } from './Constants';
import Button from './Button';
import { moveRelease, removeShelf } from './actions';

const shelfTarget = {
  drop(props, monitor, component) {
    const { mergedProps } = component
    mergedProps.dispatch(moveRelease(monitor.getItem(), props.shelf))
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class Shelf extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveShelf = this.handleRemoveShelf.bind(this);
  }

  handleRemoveShelf() {
    const { dispatch, shelf } = this.props;
    dispatch(removeShelf(shelf.id))
  }

  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 72,
        left: 0,
        height: '58%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  } 

  render() {
    const { shelf, isOver, connectDropTarget } = this.props;
    const { name, onShelf } = shelf;

    return connectDropTarget(
      <div style={{
        marginLeft: '7%',
        marginRight: '7%',
        position: 'relative',
      }}>
      <input value={name} />
        <div style={{
          width: '100%',
          height: '180px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,1) 40%, rgba(94,1,15,1) 0%,rgba(143,2,34,1) 4%,rgba(128,1,30,0.9) 45%,rgba(111,0,25,0.7) 97%,rgba(109,0,25,1) 100%)',
          display: 'flex',
          flexFlow: 'row wrap',
          overflow: 'hidden',
          justifyContent: 'space-around',
          position: 'relative',
        }}>
          {this.props.children}
          {isOver && this.renderOverlay('yellow')}
        </div>
      <Button action={this.handleRemoveShelf}
              isCloseButton={true}
      />
      </div>
    );
  }
}

Shelf.propTypes = {
  shelf: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isOver: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {};
}

export default flow(
  connect(mapStateToProps),
  DropTarget(ItemTypes.RELEASE, shelfTarget, collect)
)(Shelf);
