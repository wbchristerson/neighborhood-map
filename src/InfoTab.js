import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
// import RaisedButton from 'material-ui/RaisedButton'
// import FontIcon from 'material-ui/FontIcon'
// import ActionHome from 'material-ui/svg-icons/action/home'

class InfoTab extends Component {
  state = {
    imageSrc: '',
    address: '',
    formattedAddress: '',
    coordinates: [],
    categories: [],
    phoneContact: '',
    twitterContact: '',
    facebookContact: '',
  }

  // fetch(`https://api.foursquare.com/v2/venues/search?ll=33.888928,-118.393534&client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815&near&query=Target&limit=1`)
  componentDidMount() {
    fetch(`https://api.foursquare.com/v2/venues/search?ll=33.888928,-118.393534&client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815&near&query=${this.props.currentPlace}&limit=1`)
    .then((res) => res.text())
    .then((text) => {
      let formattedResponse = JSON.parse(text).response.venues[0];
      // console.log("Result: ", formattedResponse)
      // console.log("Address: ", formattedResponse.location)
      this.setState({
        address: formattedResponse.location.crossStreet,
        formattedAddress: formattedResponse.location.formattedAddress[0] + ', ' + formattedResponse.location.formattedAddress[1],
        coordinates: [formattedResponse.location.lat, formattedResponse.location.lng]
      })
      return formattedResponse.id
    })
    .then((id) => {
      fetch(`https://api.foursquare.com/v2/venues/${id}/photos?client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815`)
      .then((res) => res.text())
      .then((text) => {
        let formattedNewResponse = JSON.parse(text)
        // console.log("Photo List: ", formattedNewResponse.response.photos)
        let imageInfo = formattedNewResponse.response.photos.items[0]
        this.setState({
          imageSrc: imageInfo.prefix + 'original' + imageInfo.suffix
        })
      })
      return id
    })
    .then((id) => {
      fetch(`https://api.foursquare.com/v2/venues/${id}?client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815`)
      .then((res) => res.text())
      .then((text) => {
        let allData = JSON.parse(text).response.venue
        console.log("The Text: ", allData)
        this.setState({
          categories: allData.categories,
          phoneContact: (allData.hasOwnProperty('contact') && allData.contact.hasOwnProperty('formattedPhone')) ?
            allData.contact.formattedPhone : '',
          twitterContact: (allData.hasOwnProperty('contact') && allData.contact.hasOwnProperty('twitter')) ?
            allData.contact.twitter : '',
          facebookContact: (allData.hasOwnProperty('contact') && allData.contact.hasOwnProperty('facebookName')) ?
            allData.contact.facebookName : '',
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
    return (
      <div className="search-format">
        <div className="title-block">
          <IconButton onClick={() => this.props.setClicked(false)} tooltip="Font Icon">
            <ArrowBack/>
          </IconButton>
          <div className="title-place">{this.props.currentPlace}</div>
        </div>
        {this.state.imageSrc && <img className="image-dimensions" src={this.state.imageSrc} alt="Test"/>}
        {this.state.address && <div>Address: {this.state.address}</div>}
        {this.state.formattedAddress && <div>Location: {this.state.formattedAddress}</div>}
        {this.state.coordinates.length === 2 && <div>Coordinates: ({this.state.coordinates[0]}, {this.state.coordinates[1]})</div>}
        <div>Categories:</div>
        {this.state.categories.map((category) => (<div key={category.id}>{category.name}</div>))}
        {(this.state.phoneContact || this.state.twitterContact) && <div>Contact:</div>}
        {this.state.phoneContact && <div>Phone: {this.state.phoneContact}</div>}
        {this.state.twitterContact && <div>Twitter: {this.state.twitterContact}</div>}
        {this.state.facebookContact && <div>Facebook: {this.state.facebookContact}</div>}
      </div>
    )
  }
}

export default InfoTab
