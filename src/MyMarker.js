import React, { Component } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'
// import { StreetView } from 'react-google-map-street-view'
import Panorama from './Panorama'

// import scriptLoader from 'react-async-script-loader'

class MyMarker extends Component {
  state = {
    isOpen: false,
  }

  // componentDidMount() {
  //   fetch(`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10&key=AIzaSyCS3Ijzo5Ona6YUsFuvRlHy1NFDEsmesoI`)
  //   .then((res) => res.text())
  //   .then((text) => {
  //     let formattedH = JSON.parse(text)
  //     console.log("Here: ", formattedH)
  //     this.setState({
  //       image: text,
  //     })
  //   })
  // }

  onToggleOpen = () => {
    if (this.state.isOpen && (this.props.title === this.props.currentPlace)) {
      this.props.setClicked(false)
      this.props.setCurrentPlace('')
      this.props.resetFilteredPlaces()
    } else if (!this.state.isOpen) {
      this.props.setClicked(false) // allow for componentDidMount to be called again in InfoTab.js
      this.props.setCurrentPlace(this.props.title)
      this.props.setClicked(true)
    }
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }))
  }

  // getPixelPositionOffset = (width, height) => ({
  //   x: -(width / 2),
  //   y: -(height / 2),
  // })

  render() {
    return (
      <Marker
        key={this.props.title}
        title={this.props.title}
        position={this.props.position}
        onClick={this.onToggleOpen}
        animation={(this.props.title === this.props.currentPlace) ? 2 : 0}
      >
        {this.state.isOpen &&
          <InfoWindow onCloseClick={this.onToggleOpen}>
            <div style={{width: `300px`, height: `300px`}}>
              <div className="marker-title-style"><b>{this.props.title}</b></div>
              <Panorama position={this.props.position} forStreetView={this.props.forStreetView}/>
            </div>
          </InfoWindow>}
      </Marker>
    )
  }
  // <div>{this.props.title}</div>
  // <StreetViewPanorama style={{width: 50, height: 50}} defaultPosition={{ lat: 49.2853171, lng: -123.1119202 }} visible/>

  // <img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350" />


  // <StreetViewPanorama style={{width: 50}} defaultPosition={{ lat: 49.2853171, lng: -123.1119202 }} visible>
  //
  // </StreetViewPanorama>


  // <div>
  //   <div>{this.props.title}</div>
  //   <StreetViewPanorama defaultPosition={{ lat: 49.2853171, lng: -123.1119202 }} visible>
  //     <OverlayView
  //       position={{ lat: 49.28590291211115, lng: -123.11248166065218 }}
  //       mapPaneName={OverlayView.OVERLAY_LAYER}
  //       getPixelPositionOffset={this.getPixelPositionOffset}
  //     >
  //       <div style={{ background: `red`, color: `white`, padding: 5, borderRadius: `50%` }}>
  //         OverlayView
  //       </div>
  //     </OverlayView>
  //   </StreetViewPanorama>
  // </div>
}

// export default scriptLoader(
//   ["https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCS3Ijzo5Ona6YUsFuvRlHy1NFDEsmesoI"]
// )(MyMarker)
export default MyMarker;
