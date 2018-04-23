import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, StreetViewPanorama, OverlayView } from 'react-google-maps'
import { compose, withProps } from 'recompose'

// This component is based on the example by Tom Chen for
// StreetViewPanorama within react-google-maps provided here:
// https://tomchentw.github.io/react-google-maps/#!/StreetViewPanorama/1

const Panorama = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCS3Ijzo5Ona6YUsFuvRlHy1NFDEsmesoI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ width: `300px`, height: `280px` }} />,
    center: { lat: 49.2853171, lng: -123.1119202 },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap defaultZoom={8} defaultCenter={props.position}>
    <StreetViewPanorama defaultPosition={{lat: props.position.lat, lng: props.position.lng}} visible/>
  </GoogleMap>
);

export default Panorama;
