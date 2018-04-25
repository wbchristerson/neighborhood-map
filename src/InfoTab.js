import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { List, ListItem } from 'material-ui/List'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
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
    url: '',
    openStatus: '',
    timeFrames: [],
    popularTimes: [],
    rating: -1.0,
    tip: '',
    menuUrl: '',
    menuMobileUrl: '',
    price: '',
    description: '',
    likesCount: -1,
    location: '',
  }

  componentDidMount() {
    fetch(`https://api.foursquare.com/v2/venues/search?ll=33.888928,-118.393534&client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815&near&query=${this.props.currentPlace}&limit=1`)
    .then((res) => res.text())
    .then((text) => {
      let formattedResponse = JSON.parse(text).response.venues[0];
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
          url: (allData.hasOwnProperty('url')) ? allData.url : '',
          openStatus: ((allData.hasOwnProperty('hours') && allData.hours.hasOwnProperty('status')) ?
            allData.hours.status : ''),
          timeFrames: ((allData.hasOwnProperty('hours') && allData.hours.hasOwnProperty('timeframes')) ?
            allData.hours.timeframes : []),
          popularTimes: ((allData.hasOwnProperty('popular') && allData.popular.hasOwnProperty('timeframes')) ?
            allData.popular.timeframes : []),
          rating: (allData.hasOwnProperty('rating') ? allData.rating : -1.0),
          tip: ((allData.hasOwnProperty('tips') &&
            allData.tips.hasOwnProperty('groups') &&
            (allData.tips.groups.length > 0) &&
            allData.tips.groups[0].hasOwnProperty('items') &&
            (allData.tips.groups[0].items.length > 0) &&
            allData.tips.groups[0].items[0].hasOwnProperty('text')) ? allData.tips.groups[0].items[0].text : ''),
          menuUrl: (allData.hasOwnProperty('menu') && allData.menu.hasOwnProperty('url')) ? allData.menu.url : '',
          menuMobileUrl: (allData.hasOwnProperty('menu') && allData.menu.hasOwnProperty('mobileUrl')) ? allData.menu.mobileUrl : '',
          price: (allData.hasOwnProperty('price') && allData.price.hasOwnProperty('message')) ? allData.price.message : '',
          description: allData.hasOwnProperty('description') ? allData.description : '',
          likesCount: (allData.hasOwnProperty('likes') && allData.likes.hasOwnProperty('count')) ? allData.likes.count : -1,
          location: ((allData.hasOwnProperty('location') && allData.location.hasOwnProperty('address')) ? allData.location.address : '')
        })
      })
    })
    .catch((error) => console.log("Error: ", error))
  }

  backToSearch = () => {
    this.props.setClicked(false)
    // this.props.setCurrentPlace('')
    this.props.resetFilteredPlaces()
  }

  render() {
    return (
      <div className="search-format">
        <div className="title-block">
          <IconButton style={{marginTop: 'auto', marginBottom: 'auto'}} onClick={this.backToSearch} tooltip="Font Icon">
            <ArrowBack />
          </IconButton>
          <div className="title-place">{this.props.currentPlace}</div>
        </div>
        <div className="location-style">
          {this.state.imageSrc && <img className="image-dimensions" src={this.state.imageSrc} alt="Test"/>}
          <List>
            {this.state.description &&
              <ListItem
                // hoverColor='#62f442'
                primaryText={<div>Description: {this.state.description}</div>}
                // rightIcon={<HomeIcon />}
              ></ListItem>}
            {(this.state.address || this.state.location) &&
              <ListItem>
                {!this.state.location && <div>Address: {this.state.address}</div>}
                {this.state.formattedAddress && <div>Location: {this.state.formattedAddress}</div>}
                {this.state.location && !this.state.address && !this.state.formattedAddress && <div>Location: {this.state.location}</div>}
              </ListItem>}
            {(this.state.coordinates.length === 2) &&
              <ListItem>Coordinates: ({this.state.coordinates[0]}, {this.state.coordinates[1]})</ListItem>}
            {(this.state.categories.length > 0) &&
              <ListItem>
                Categories:
                {this.state.categories.map((category) => (<div key={category.id}>{category.name}</div>))}
              </ListItem>}
            {(this.state.phoneContact || this.state.twitterContact || this.state.facebookContact) &&
              <ListItem>
                Contact:
                {this.state.phoneContact && <div>Phone: {this.state.phoneContact}</div>}
                {this.state.twitterContact && <div>Twitter: {this.state.twitterContact}</div>}
                {this.state.facebookContact && <div>Facebook: {this.state.facebookContact}</div>}
              </ListItem>}
            {this.state.url &&
              <ListItem>
                URL: {this.state.url}
              </ListItem>}
            {this.state.openStatus &&
              <ListItem>
                Current Status: {this.state.openStatus}
              </ListItem>}
            {(this.state.timeFrames.length > 0) &&
              <ListItem>
                Schedule:
                {this.state.timeFrames.map((time) => {
                  if (time.hasOwnProperty('includesToday') && time.includesToday) {
                    return ( <div key={time.days}><b>{time.days}: {time.open.map((interval) => <div key={interval.renderedTime}>{interval.renderedTime}</div>)}</b></div> )
                  } else {
                    return ( <div key={time.days}>{time.days}: {time.open.map((interval) => <div key={interval.renderedTime}>{interval.renderedTime}</div>)}</div> )
                  }
                })}
              </ListItem>}
            {(this.state.popularTimes.length > 0) &&
              <ListItem>
                Popular Times:
                {this.state.popularTimes.map((time) => {
                  if (time.hasOwnProperty('days') && (time.days === 'Today')) {
                    return ( <div key={time.days}><b>{time.days}: {time.open.map((interval) => <div key={interval.renderedTime}>{interval.renderedTime}</div>)}</b></div> )
                  } else {
                    return ( <div key={time.days}>{time.days}: {time.open.map((interval) => <div key={interval.renderedTime}>{interval.renderedTime}</div>)}</div> )
                  }
                })}
              </ListItem>}
            {(this.state.rating >= 0.0) &&
              <ListItem>
                Rating: {this.state.rating}/10
              </ListItem>}
            {this.state.tip &&
              <ListItem>
                One visitor had this to say: "{this.state.tip}"
              </ListItem>}
            {this.state.menuUrl &&
              <ListItem>
                Menu (provided courtesy of Foursquare): {this.state.menuUrl}
              </ListItem>}
            {this.state.price &&
              <ListItem>
                Price Tier: {this.state.price}
              </ListItem>}
            {(this.state.likesCount >= 0) &&
              <ListItem>
                {this.state.likesCount} <ThumbUp />
              </ListItem>}
          </List>
        </div>
      </div>
    )
  }
}

export default InfoTab
