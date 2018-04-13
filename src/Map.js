import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from 'google-map-react'

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// Note: This React component came from the example provided by istarkov in the
// documentation of this repository:
// https://github.com/google-map-react/google-map-react

class Map extends Component {
  // static defaultProps = {
  //   center: {
  //     lat: 59.95,
  //     lng: 30.33
  //   },
  //   zoom: 11
  // };

  // The renderMarkers function below is based on this Stack Overflow post:
  // https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-
  // in-google-map-react?utm_medium=organic&utm_source=google_rich_qa&utm_
  // campaign=google_rich_qa

  renderMarkers(map, maps) {
    let marker = new maps.Marker({
      position: { lat: 33.888928, lng: -118.393534 },
      map,
      title: 'Hello World!'
    });
  }

  render() {
    // var marker = new google.maps.Marker({
    //   position: this.props.center,
    //   map: map,
    //   title: 'First Marker'
    // });
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '80%', float: 'right' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCS3Ijzo5Ona6YUsFuvRlHy1NFDEsmesoI' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
        >
        </GoogleMapReact>
      </div>
    );
  }
}
// <AnyReactComponent
// lat={59.955413}
// lng={30.337844}
// text={'Kreyser Avrora'}
// />

// const Marker = props => {
//   return <div className="SuperAwesomePin"></div>
// }

export default Map;
