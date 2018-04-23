import React from 'react'
import MyMarker from './MyMarker'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
// import GoogleMapReact from 'google-map-react'
// import Marker from 'google-map-react'




/*  The structure of this component is based on the examples provided here:
 *  https://tomchentw.github.io/react-google-maps/ and here:
 *  https://github.com/tomchentw/react-google-maps/blob/master/src/components/InfoWindow.md
 */

const MyMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.center}
    // defaultCenter={{ lat: -34.396, lng: 150.644 }}
  >
    {props.filteredPlaces.map((place) => {
      return (
        <MyMarker
          key={place.title}
          title={place.title}
          position={place.location}
          // markerSetClicked={this.props.markerSetClicked}
          // objectReference={this.props.objectReference}
          // setCurrentPlace={(place) => this.props.setCurrentPlace(place)} />
          // objectReference={props.objectReference}
          setClicked={props.setClicked}
          setCurrentPlace={props.setCurrentPlace}
          currentPlace={props.currentPlace}
        />
      )
    })}
  </GoogleMap>
))

// <Marker key={place.title} title={place.title} position={place.location}>
//   <InfoWindow><div>Something</div></InfoWindow>
// </Marker>


//
// // const AnyReactComponent = ({ text }) => <div>{text}</div>;
//
// // Note: This React component came from the example provided by istarkov in the
// // documentation of this repository:
// // https://github.com/google-map-react/google-map-react
//
// class Map extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   };
//   state = {
//     markers: []
//   }
//
//   arr = []
//
//   // The renderMarkers function below is based on this Stack Overflow post:
//   // https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-
//   // in-google-map-react?utm_medium=organic&utm_source=google_rich_qa&utm_
//   // campaign=google_rich_qa
//
//   renderMarkers(map, maps) {
//     if (this.arr.length === 0) {
//       this.arr.push(new maps.Marker({
//         position: this.props.center,
//         map,
//         title: "Test For Marker"
//       }))
//     }
//     if (this.props.filterQuery !== '') {
//       this.arr[0].setMap(null)
//     }
//   }
//
//   render() {
//     console.log("Filter Query: ", this.props.filterQuery)
//     return (
//       <div style={{ height: '100vh', width: '80%', float: 'right' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: 'AIzaSyCS3Ijzo5Ona6YUsFuvRlHy1NFDEsmesoI' }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//           onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
//         >
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }
//
export default MyMap;
