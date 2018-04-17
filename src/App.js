import React, { Component } from 'react'
import logo from './logo.svg';
import Map from './Map'
import Search from './Search'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import escapeRegExp from 'escape-string-regexp'

class App extends Component {
  state = {
    placesList: [
      { title: "Roundhouse Aquarium", location: {lat: 33.883368, lng: -118.414595} },
      { title: "Becker's Bakery & Deli", location: {lat: 33.883937, lng: -118.410461} },
      { title: "The Kettle", location: {lat: 33.885366, lng: -118.409663} },
      { title: "California Pizza Kitchen", location: {lat: 33.899041, lng: -118.394780} },
      { title: "Whole Foods", location: {lat: 33.906682, lng: -118.392783} },
      { title: "Ralphs", location: {lat: 33.896281, lng: -118.394272} },
      { title: "Pages Book Store", location: {lat: 33.883141, lng: -118.409656} },
      { title: "Peet's Coffee & Tea", location: {lat: 33.885273, lng: -118.408892} },
      { title: "Martha's 22nd Street Grill", location: {lat: 33.869321, lng: -118.403978} },
      { title: "45th Street Beach", location: {lat: 33.904201, lng: -118.422161} },
      { title: "Target", location: {lat: 33.888592, lng: -118.394307} },
      { title: "Islands Restaurant", location: {lat: 33.899627, lng: -118.394053} },
      { title: "El Sombrero", location: {lat: 33.874037, lng: -118.394050} },
      { title: "Von's", location: {lat: 33.885148, lng: -118.407879} },
      { title: "Barnes and Noble", location: {lat: 33.900630, lng: -118.380849} },
      { title: "Mira Costa High School", location: {lat: 33.873556, lng: -118.389907} },
      { title: "Manhattan Beach Library", location: {lat: 33.887115, lng: -118.410357} }
    ],
    filterQuery: '',
    imageSrc: '',
  }

  // updateImage (newImageSrc) {
  //   this.setState({
  //     imageSrc: newImageSrc,
  //   })
  // }

  componentDidMount() {
    fetch(`https://api.foursquare.com/v2/venues/search?ll=33.888928,-118.393534&client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815&near&query=target&limit=1`)
    .then((res) => res.text())
    .then((text) => {
      let formattedResponse = JSON.parse(text).response.venues[0];
      console.log("Droid: ", formattedResponse)
      // let imgUrlObj = formattedResponse.categories[0].icon;
      // this.setState({
      //   imageSrc: imgUrlObj.prefix + 'original' + imgUrlObj.suffix
      // })
      return formattedResponse.id
    })
    .then((id) => {
      fetch(`https://api.foursquare.com/v2/venues/${id}/photos?client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815`)
      .then((res) => res.text())
      .then((text) => {
        let formattedNewResponse = JSON.parse(text)
        let imageInfo = formattedNewResponse.response.photos.items[0]
        this.setState({
          imageSrc: imageInfo.prefix + '36x36' + imageInfo.suffix
        })
      })
    })
    .catch((error) => console.log("Error: ", error))

    // fetch(`https://api.foursquare.com/v2/venues/search?ll=33.888928,-118.393534&client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815&near&query=target&limit=1`, {
    //   method: 'GET',
    // })
    // .then((res) => console.log("Result: ", res ))
    // .catch((error) => console.log("Error: ", error))
    // https://api.foursquare.com/v2/venues/search?ll=33.8,-118.4&client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815&near&query=target&limit=3


    // function handleSuccess(req, outerContext) {
    //   console.log("Request: ", req)
    //   console.log("Outer Context: ", outerContext)
    //
    //   let targetObject = JSON.parse(req.responseText).response.venues[0];
    //   console.log("Target Object: ", targetObject);
    //   let pre = targetObject.categories[0].icon.prefix;
    //   let suf = targetObject.categories[0].icon.suffix;
    //   console.log("Pre: ", pre);
    //   outerContext.setState({
    //     imageSrc: pre + '300x500' + suf,
    //   })
    // }
    //
    // function handleError () {
    //   console.log( 'An error occurred \uD83D\uDE1E' );
    // }
    //
    // const asyncRequestObject = new XMLHttpRequest();
    // asyncRequestObject.open('GET', 'https://api.foursquare.com/v2/venues/search?ll=33.888928,-118.393534&client_id=TPSVD55HZSB2CSKSFO1QITDRGGDUBXR1320V1C42EKBFC30T&client_secret=VZCPYPTDGXIBA2CJ3MQ4AU0SHRW0QOUUGYKWIXOZAZ20ID4U&v=20130815&near&query=target&limit=1');
    // asyncRequestObject.onload = (() => handleSuccess(asyncRequestObject, this));
    // asyncRequestObject.onerror = handleError;
    // asyncRequestObject.send();
  }

  setMarkerQuery(newQuery) {
    this.setState({
      filterQuery: newQuery
    })
  }

  render() {
    let filteredPlaces
    if (this.state.filterQuery) {
      const match = new RegExp(escapeRegExp(this.state.filterQuery), 'i')
      filteredPlaces = this.state.placesList.filter((place) => match.test(place.title))
    } else {
      filteredPlaces = this.state.placesList
    }

    return (
      <div className="app-format">
        <MuiThemeProvider>
          <Search placesList={this.state.placesList} setMarkerQuery={this.setMarkerQuery.bind(this)} />
        </MuiThemeProvider>
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCS3Ijzo5Ona6YUsFuvRlHy1NFDEsmesoI&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={< div style={{ width: `80%`, height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          center={{ lat: 33.888928, lng: -118.393534 }}
          zoom={14}
          filteredPlaces={filteredPlaces}/>
        {this.state.imageSrc && <img src={this.state.imageSrc} alt="Test"/>}
      </div>
    );
  }
  // <div className="App">
  // <header className="App-header">
  // <img src={logo} className="App-logo" alt="logo" />
  // <h1 className="App-title">Welcome to React</h1>
  // </header>
  // <p className="App-intro">
  // To get started, edit <code>src/App.js</code> and save to reload.
  // </p>
  // </div>
}

export default App;
