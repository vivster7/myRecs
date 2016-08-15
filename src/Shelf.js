import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import Release from './Release';
import { ItemTypes } from './Constants';
import { addRelease, removeRelease } from './actions';

const shelfTarget = {
  drop(props, monitor) {
    console.log(props)
    console.log(monitor.getItem())
    addRelease(props.item, props.target)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class Shelf extends Component {

  renderRelease(release) {
    const { key, title } = release;
    return <Release key={key} title={title}/>
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
    const { 
      key, name, onShelf, releases,
      connectDropTarget, isOver, 
   } = this.props;

    const releasesOnShelf = onShelf.map((t) =>
      this.renderRelease(releases[t])
    );

    console.log(key);
    console.log(name);


    return connectDropTarget(
      <div style={{
        marginLeft: '7%',
        marginRight: '7%',
      }}>
      <span>{name}</span>
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
          {releasesOnShelf}
          {isOver && this.renderOverlay('yellow')}
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {
  key: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onShelf: PropTypes.array.isRequired,
  isOver: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  window.s = state;
  const { releases } = state;
  return { releases }
}

export default flow(
  connect(mapStateToProps),
  DropTarget(ItemTypes.RELEASE, shelfTarget, collect)
)(Shelf);
