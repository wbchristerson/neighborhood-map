import React, { Component } from 'react'
import MyMap from './MyMap'
import Search from './Search'
import InfoTab from './InfoTab'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import escapeRegExp from 'escape-string-regexp'

class App extends Component {
  state = {
    placesList: [
      { title: "Roundhouse Aquarium And Cafe", placeType: "cafe", location: {lat: 33.883368, lng: -118.414595}, forStreetView: {lat: 33.883355, lng: -118.414639}},
      { title: "Becker's Bakery & Deli", placeType: "bakery", location: {lat: 33.883937, lng: -118.410461}, forStreetView: {lat: 33.883937, lng: -118.410461}},
      { title: "The Kettle", placeType: "restaurant", location: {lat: 33.885366, lng: -118.409663}, forStreetView: {lat: 33.885366, lng: -118.409663}},
      { title: "California Pizza Kitchen", placeType: "restaurant", location: {lat: 33.899041, lng: -118.394780}, forStreetView: {lat: 33.898773, lng: -118.394781} },
      { title: "Whole Foods", placeType: "grocery store", location: {lat: 33.906682, lng: -118.392783}, forStreetView: {lat: 33.906078, lng: -118.392783}},

      { title: "Ralphs", placeType: "grocery store", location: {lat: 33.896281, lng: -118.394272} },
      { title: "Pages Book Store", placeType: "books", location: {lat: 33.883141, lng: -118.409656} },
      { title: "Peet's Coffee & Tea", placeType: "cafe", location: {lat: 33.885273, lng: -118.408892} },
      { title: "Martha's 22nd Street Grill", placeType: "restaurant", location: {lat: 33.869321, lng: -118.403978} },
      { title: "Beach, Manhattan Beach", placeType: "beach", location: {lat: 33.887159533767874, lng: -118.41460291075771} },
      { title: "Target", placeType: "grocery store", location: {lat: 33.888592, lng: -118.394307} },
      { title: "Islands Restaurant", placeType: "restaurant", location: {lat: 33.899627, lng: -118.394053} },
      { title: "El Sombrero", placeType: "restaurant", location: {lat: 33.874037, lng: -118.394050} },
      { title: "Von's", placeType: "grocery store", location: {lat: 33.885148, lng: -118.407879} },
      { title: "Barnes and Noble", placeType: "books", location: {lat: 33.900680, lng: -118.380349} },
      { title: "Mira Costa High School", placeType: "school", location: {lat: 33.873556, lng: -118.389907} },
      { title: "Manhattan Beach Library", placeType: "books", location: {lat: 33.887115, lng: -118.410357} },
      { title: "Trader Joe's", placeType: "grocery store", location: {lat: 33.900345, lng: -118.381278} }
    ],
    filterQuery: '',
    imageSrc: '',
    itemClicked: false, // whether a specific item has been clicked
    currentPlace: '', // place being considered
    filteredPlaces: [],
    // currentLocation: {}, // lat, lng coordinates of location
  }

  componentDidMount() {
    this.resetFilteredPlaces()
  }
  // componentDidMount() {
  //   fetch(`https://api.foursquare.com/v2/venues/search?ll=33.888928,-118.393534&client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815&near&query=target&limit=1`)
  //   .then((res) => res.text())
  //   .then((text) => {
  //     let formattedResponse = JSON.parse(text).response.venues[0];
  //     return formattedResponse.id
  //   })
  //   .then((id) => {
  //     fetch(`https://api.foursquare.com/v2/venues/${id}/photos?client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815`)
  //     .then((res) => res.text())
  //     .then((text) => {
  //       let formattedNewResponse = JSON.parse(text)
  //       let imageInfo = formattedNewResponse.response.photos.items[0]
  //       this.setState({
  //         imageSrc: imageInfo.prefix + '36x36' + imageInfo.suffix
  //       })
  //     })
  //   })
  //   .catch((error) => console.log("Error: ", error))
  // }

  setClicked(status) { ////////////////////////////////////////////////////////////////////////////////////
    // this.setState({
    //   itemClicked: !status,
    // })
    this.setState({
      itemClicked: status,
    })
  }

  // markerSetClicked(status, ref) {
  //   ref.setState({
  //     itemClicked: status,
  //   })
  // }

  setMarkerQuery(newQuery) {
    this.setState({
      filterQuery: newQuery
    })
  }

  setCurrentPlace(name) {
    this.setState({
      currentPlace: name,
    })
  }

  resetFilteredPlaces() {
    this.setState({
      filteredPlaces: this.state.placesList
    })
  }

  updateFilteredPlaces(query) {
    const match = new RegExp(escapeRegExp(query), 'i')
    this.setState({
      filteredPlaces: this.state.placesList.filter((place) => match.test(place.title))
    })
    // if (this.state.filterQuery) {
    //   const match = new RegExp(escapeRegExp(this.state.filterQuery), 'i')
    //   filteredPlaces = this.state.placesList.filter((place) => match.test(place.title))
    // } else {
    //   filteredPlaces = this.state.placesList
    // }
  }

  render() {
    // this.setState({
    //   filteredPlaces: filteredPlaces
    // })

    return (
      <div className="app-format">
        {!this.state.itemClicked &&
          <MuiThemeProvider>
            <Search
              placesList={this.state.placesList}
              setCurrentPlace={this.setCurrentPlace.bind(this)}
              setClicked={this.setClicked.bind(this)}
              setMarkerQuery={this.setMarkerQuery.bind(this)}
              updateFilteredPlaces={this.updateFilteredPlaces.bind(this)}
            />
          </MuiThemeProvider>}
        {this.state.itemClicked &&
          <MuiThemeProvider>
            <InfoTab
              setClicked={this.setClicked.bind(this)}
              resetFilteredPlaces={this.resetFilteredPlaces.bind(this)}
              currentPlace={this.state.currentPlace}/>
          </MuiThemeProvider>}
        <MyMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCS3Ijzo5Ona6YUsFuvRlHy1NFDEsmesoI&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={< div style={{ width: `80%`, height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          center={{ lat: 33.888428, lng: -118.393534 }}
          zoom={14}
          filteredPlaces={this.state.filteredPlaces}
          setClicked={this.setClicked.bind(this)}
          setCurrentPlace={this.setCurrentPlace.bind(this)}
          currentPlace={this.state.currentPlace}
          resetFilteredPlaces={this.resetFilteredPlaces.bind(this)}
          // objectReference={this}
        />
      </div>
    );
  }
}
// {this.state.imageSrc && <img src={this.state.imageSrc} alt="Test"/>}

export default App;
