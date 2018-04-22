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
    url: '',
    openStatus: '',
    timeFrames: [],
    popularTimes: [],
    rating: -1.0,
    tip: '',
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
        <div className="location-style">
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
          {this.state.url && <div>URL: {this.state.url}</div>}
          {this.state.openStatus && <div>Current Status: {this.state.openStatus}</div>}
          {(this.state.timeFrames.length > 0) &&
            <div>
              Schedule:
              {this.state.timeFrames.map((time) => {
                if (time.hasOwnProperty('includesToday') && time.includesToday) {
                  return ( <div key={time.days}><b>{time.days}: {time.open.map((interval) => <div key={interval.renderedTime}>{interval.renderedTime}</div>)}</b></div> )
                } else {
                  return ( <div key={time.days}>{time.days}: {time.open.map((interval) => <div key={interval.renderedTime}>{interval.renderedTime}</div>)}</div> )
                }
              })}
            </div>
          }
          {(this.state.popularTimes.length > 0) &&
            <div>
              Popular Times:
              {this.state.popularTimes.map((time) => {
                if (time.hasOwnProperty('days') && (time.days === 'Today')) {
                  return ( <div key={time.days}><b>{time.days}: {time.open.map((interval) => <div key={interval.renderedTime}>{interval.renderedTime}</div>)}</b></div> )
                } else {
                  return ( <div key={time.days}>{time.days}: {time.open.map((interval) => <div key={interval.renderedTime}>{interval.renderedTime}</div>)}</div> )
                }
              })}
            </div>
          }
          {(this.state.rating >= 0.0) && <div>Rating: {this.state.rating}/10</div>}
          {this.state.tip && <div>One visitor had this to say: {this.state.tip}</div>}
        </div>
      </div>
    )
  }
}

export default InfoTab
