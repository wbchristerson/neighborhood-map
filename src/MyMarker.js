import React, { Component } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'

class MyMarker extends Component {
  state = {
    isOpen: false,
  }

  onToggleOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }))
  }

  render() {
    return (
      <Marker
        key={this.props.title}
        title={this.props.title}
        position={this.props.position}
        onClick={this.onToggleOpen}
      >
        {this.state.isOpen &&
          <InfoWindow onCloseClick={this.onToggleOpen}>
            <div>Something</div>
          </InfoWindow>}
      </Marker>
    )
  }
}

export default MyMarker;
