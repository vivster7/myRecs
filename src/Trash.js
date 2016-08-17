import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import flow from 'lodash/flow';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './Constants';
import { moveRelease } from './actions';


const trashTarget = {
  drop(props, monitor, component) {
    const { mergedProps } = component
    mergedProps.dispatch(moveRelease(monitor.getItem(), {id: -1}))
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

class Trash extends Component {

  render() {

    const { canDrop, isOver, connectDropTarget } = this.props;

    return connectDropTarget(
      <div style={{
        fontSize: '500%',
        position: 'fixed',
        bottom: '0px',
        right: '0px',
        opacity: canDrop ? 1 : 0.5,
        background: isOver ? 'yellow' : 'white',
      }}>
        🗑
      </div>
    )
  }
}

Trash.propTypes = {
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool,
}


function mapStateToProps() {
  return {}
}

export default flow(
  connect(mapStateToProps),
  DropTarget(ItemTypes.RELEASE, trashTarget, collect)
)(Trash);

