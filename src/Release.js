import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './Constants';

const releaseSource = {
  beginDrag(props) {
    return { key: props };
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

export class Release extends Component {
  render() {
    const { 
      title, connectDragSource, isDragging
     } = this.props;

    const titleStyle = {
      color: 'white',
      background: 'rgba(0, 0, 0, 0.7)',
      width: '90%',
      padding: `5%`,
      filter: 'blur(5px)',
      textAlign: 'center',
      position: 'absolute',
      bottom: 0,
    };

    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        height: 150,
        width: 150,
        backgroundSize: 150,
        backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Vinyl_record.svg/2000px-Vinyl_record.svg.png")`,
        position: `relative`,
        top: 15,
        marginBottom: 20,
      }}>
        <span style={titleStyle}>
          <b>{title}</b>
        </span>
      </div>
    );
  }
}

Release.propTypes = {
  key: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  // labels: PropTypes.array.isRequired,
  // formats: PropTypes.array.isRequired,
  // artists: PropTypes.array.isRequired,
  // date: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default DragSource(ItemTypes.RELEASE, releaseSource, collect)(Release);



  //  {  
  //        "instance_id":27869409,
  //        "date_added":"2010-01-10T05:22:22-08:00",
  //        "basic_information":{  
  //           "labels":[  
  //              {  
  //                 "name":"[OHM] Records",
  //                 "entity_type":"1",
  //                 "catno":"1.0 OHM",
  //                 "resource_url":"https://api.discogs.com/labels/11963",
  //                 "id":11963,
  //                 "entity_type_name":"Label"
  //              }
  //           ],
  //           "formats":[  
  //              {  
  //                 "descriptions":[  
  //                    "Mini"
  //                 ],
  //                 "name":"CD",
  //                 "qty":"1"
  //              }
  //           ],
  //           "thumb":"",
  //           "title":"Sound Of Music",
  //           "artists":[  
  //              {  
  //                 "join":"",
  //                 "name":"Jazkamer",
  //                 "anv":"Jazzkammer",
  //                 "tracks":"",
  //                 "role":"",
  //                 "resource_url":"https://api.discogs.com/artists/342474",
  //                 "id":342474
  //              }
  //           ],
  //           "resource_url":"https://api.discogs.com/releases/198657",
  //           "year":2002,
  //           "id":198657
  //        },
  //        "id":198657,
  //        "rating":0
  //     },