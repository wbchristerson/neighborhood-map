import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
// import RaisedButton from 'material-ui/RaisedButton'
// import FontIcon from 'material-ui/FontIcon'
// import ActionHome from 'material-ui/svg-icons/action/home'

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
    // <FontIcon className="muidocs-icon-action-home" />
    // <IconButton iconClassName="muidocs-icon-custom-github" onClick={() => this.props.setClicked(false)} />
    // <ActionHome/>
    // <RaisedButton onClick={() => this.props.setClicked(false)} label="Back" style={{ margin: 12 }}/>
    console.log("Title: ", this.props.currentPlace)
    return (
      <div className="search-format">
        <IconButton onClick={() => this.props.setClicked(false)} tooltip="Font Icon">
          <ArrowBack/>
        </IconButton>
        <div>{this.props.currentPlace}</div>
        {this.state.imageSrc && <img className="image-dimensions" src={this.state.imageSrc} alt="Test"/>}
      </div>
    )
  }
}

export default InfoTab
