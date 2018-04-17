import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

class InfoTab extends Component {
  state = {
    imageSrc: ''
  }

  componentDidMount() {
    fetch(`https://api.foursquare.com/v2/venues/search?ll=33.888928,-118.393534&client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815&near&query=target&limit=1`)
    .then((res) => res.text())
    .then((text) => {
      let formattedResponse = JSON.parse(text).response.venues[0];
      return formattedResponse.id
    })
    .then((id) => {
      fetch(`https://api.foursquare.com/v2/venues/${id}/photos?client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815`)
      .then((res) => res.text())
      .then((text) => {
        let formattedNewResponse = JSON.parse(text)
        console.log("Photo List: ", formattedNewResponse.response.photos)
        let imageInfo = formattedNewResponse.response.photos.items[0]
        this.setState({
          imageSrc: imageInfo.prefix + 'original' + imageInfo.suffix
        })
      })
    })
    .catch((error) => console.log("Error: ", error))
  }

  render() {
    return (
      <div className="search-format">
        <RaisedButton onClick={() => this.props.setClicked(false)} label="Default" style={{ margin: 12 }}/>
        {this.state.imageSrc && <img className="image-dimensions" src={this.state.imageSrc} alt="Test"/>}
      </div>
    )
  }
}

export default InfoTab
