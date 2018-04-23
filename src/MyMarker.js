import React, { Component } from 'react'
import { Marker, InfoWindow, StreetViewPanorama, OverlayView } from 'react-google-maps'
// import { StreetView } from 'react-google-map-street-view'

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
    } else if (!this.state.isOpen) {
      this.props.setClicked(false) // allow for componentDidMount to be called again in InfoTab.js
      this.props.setCurrentPlace(this.props.title)
      this.props.setClicked(true)
    }
    // if (this.state.isOpen) {
    //   this.props.markerSetClicked(false, this.props.objectReference)
    // } else {
    //   this.props.markerSetClicked(true, this.props.objectReference)
    // }
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }))
  }

  // getPixelPositionOffset = (width, height) => ({
  //   x: -(width / 2),
  //   y: -(height / 2),
  // })

  render() {
    // console.log("Here: ", this.state.image)
    return (
      <Marker
        key={this.props.title}
        title={this.props.title}
        position={this.props.position}
        onClick={this.onToggleOpen}
      >
        {this.state.isOpen &&
          <InfoWindow onCloseClick={this.onToggleOpen}>
            <div>{this.props.title}</div>
          </InfoWindow>}
      </Marker>
    )
  }

  // <img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350" />
  // <StreetViewPanorama style={{width: 50, height: 50}} defaultPosition={{ lat: 49.2853171, lng: -123.1119202 }} visible/>

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

export default MyMarker;
