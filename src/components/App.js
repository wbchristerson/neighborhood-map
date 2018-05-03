import React, { Component } from 'react'
import MyMap from './MyMap'
import Search from './Search'
import InfoTab from './InfoTab'
import '../App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import escapeRegExp from 'escape-string-regexp'
import { GOOGLE_MAP_API_KEY } from '../api/APIkey'

class App extends Component {
  state = {
    placesList: [
      { title: "Roundhouse Aquarium And Cafe", placeType: "cafe", location: {lat: 33.883368, lng: -118.414595}, forStreetView: {lat: 33.883355, lng: -118.414639}},
      { title: "Becker's Bakery & Deli", placeType: "bakery", location: {lat: 33.883937, lng: -118.410461}, forStreetView: {lat: 33.883937, lng: -118.410461}},
      { title: "The Kettle", placeType: "restaurant", location: {lat: 33.885366, lng: -118.409663}, forStreetView: {lat: 33.885366, lng: -118.409663}},
      { title: "California Pizza Kitchen", placeType: "restaurant", location: {lat: 33.899041, lng: -118.394780}, forStreetView: {lat: 33.898773, lng: -118.394781} },
      { title: "Whole Foods", placeType: "grocery store", location: {lat: 33.906682, lng: -118.392783}, forStreetView: {lat: 33.906078, lng: -118.392783}},
      { title: "Ralphs", placeType: "grocery store", location: {lat: 33.896281, lng: -118.394272}, forStreetView: {lat: 33.896132, lng: -118.394689}},
      { title: "Pages Book Store", placeType: "books", location: {lat: 33.883141, lng: -118.409656}, forStreetView: {lat: 33.883016, lng: -118.409798}},
      { title: "Peet's Coffee & Tea", placeType: "cafe", location: {lat: 33.885273, lng: -118.408892}, forStreetView: {lat: 33.885352, lng: -118.408969}},
      { title: "Martha's 22nd Street Grill", placeType: "restaurant", location: {lat: 33.869321, lng: -118.403978}, forStreetView: {lat: 33.869208, lng: -118.403946}},
      { title: "Beach, Manhattan Beach", placeType: "beach", location: {lat: 33.879119, lng: -118.410365}, forStreetView: {lat: 33.883119, lng: -118.412365}},
      { title: "Target", placeType: "grocery store", location: {lat: 33.888592, lng: -118.394307}, forStreetView: {lat: 33.888528, lng: -118.394962}},
      { title: "Islands Restaurant", placeType: "restaurant", location: {lat: 33.899627, lng: -118.394053}, forStreetView: {lat: 33.899627, lng: -118.394053}},
      { title: "El Sombrero", placeType: "restaurant", location: {lat: 33.874037, lng: -118.394050}, forStreetView: {lat: 33.873124, lng: -118.393852}},
      { title: "Von's", placeType: "grocery store", location: {lat: 33.885148, lng: -118.407879}, forStreetView: {lat: 33.885682, lng: -118.408008}},
      { title: "Barnes and Noble", placeType: "books", location: {lat: 33.900680, lng: -118.380349}, forStreetView: {lat:33.900821, lng: -118.380866}},
      { title: "Mira Costa High School", placeType: "school", location: {lat: 33.873556, lng: -118.389907}, forStreetView: {lat: 33.872906, lng: -118.389748}},
      { title: "Manhattan Beach Library", placeType: "books", location: {lat: 33.887115, lng: -118.410357}, forStreetView: {lat: 33.886763, lng: -118.410652}},
      { title: "Trader Joe's", placeType: "grocery store", location: {lat: 33.900345, lng: -118.381278}, forStreetView: {lat: 33.900818, lng: -118.381172}}
    ],
    filterQuery: '',
    imageSrc: '',
    itemClicked: false, // whether a specific item has been clicked
    currentPlace: '', // place being considered
    filteredPlaces: [],
    animationConstant: 0,
  }

  componentDidMount() {
    this.resetFilteredPlaces()
  }

  setClicked(status) {
    this.setState({
      itemClicked: status,
    })
  }

  setMarkerQuery(newQuery) {
    this.setState({
      filterQuery: newQuery,
    })
  }

  setCurrentPlace(name) {
    this.setState({
      currentPlace: name,
    })
  }

  // Set a value in {0,1,2} for the type of animation displayed for the
  // currently selected place, as given by currentPlace
  setAnimationConstant(animationType) {
    this.setState({
      animationConstant: animationType,
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
  }

  render() {
    const api = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_MAP_API_KEY + '&v=3.exp&libraries=geometry,drawing,places'
    return (
      <MuiThemeProvider>
        <div role="Application">
          <header className="welcome-sign">Come Visit Manhattan Beach, California!</header>
          <main className="app-format">
            {!this.state.itemClicked &&
              <form className="search-order">
                <Search
                  placesList={this.state.placesList}
                  setCurrentPlace={this.setCurrentPlace.bind(this)}
                  setClicked={this.setClicked.bind(this)}
                  setMarkerQuery={this.setMarkerQuery.bind(this)}
                  setAnimationConstant={this.setAnimationConstant.bind(this)}
                  updateFilteredPlaces={this.updateFilteredPlaces.bind(this)}
                />
              </form>}
            {this.state.itemClicked &&
              <div role="Contentinfo" className="info-tab-order">
                <InfoTab
                  setClicked={this.setClicked.bind(this)}
                  resetFilteredPlaces={this.resetFilteredPlaces.bind(this)}
                  currentPlace={this.state.currentPlace}/>
              </div>}
            <MyMap
              googleMapURL={api}
              loadingElement={<div style={{ height: `100%`, margin: `auto`, fontSize: `28px` }}>The map view is loading.</div>}
              containerElement={<div className="map-order" />}
              mapElement={<div style={{ height: `100%` }} />}
              center={{ lat: 33.888428, lng: -118.393534 }}
              zoom={14}
              filteredPlaces={this.state.filteredPlaces}
              setClicked={this.setClicked.bind(this)}
              setCurrentPlace={this.setCurrentPlace.bind(this)}
              currentPlace={this.state.currentPlace}
              resetFilteredPlaces={this.resetFilteredPlaces.bind(this)}
              animationConstant={this.state.animationConstant}
            />
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
