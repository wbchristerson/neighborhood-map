import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import Restaurant from 'material-ui/svg-icons/maps/restaurant'
import LocalLibrary from 'material-ui/svg-icons/maps/local-library'
import LocalCafe from 'material-ui/svg-icons/maps/local-cafe'
import LocalGroceryStore from 'material-ui/svg-icons/maps/local-grocery-store'
import BeachAccess from 'material-ui/svg-icons/places/beach-access'
import Cake from 'material-ui/svg-icons/social/cake'
import School from 'material-ui/svg-icons/social/school'

// import SvgIcon from 'material-ui/SvgIcon'

// import Icon from 'material-ui/Icon'

// import ActionInfo from 'material-ui/svg-icons/action/info'

// function HomeIcon(props) {
//   return (
//     <svg style={{width: 20, height: 20 }} viewBox="0 0 20 20">
//       <path fill="#000000" d="M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z" />
//     </svg>
//   );
// }


class Search extends Component {
  state = {
    query: '',
  }

  // The structure of the controlled component for the search bar is based on the
  // information provided in the 'Building With React, Lesson 3: State Management'
  // videos

  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.props.setMarkerQuery(query)
  }

  // <Subheader>Recent chats</Subheader>
  render() {
    // The use of regular expressions and sorting below is based on the
    // information provided in one of the videos in "Introduction To React, Lesson:
    // 3, State Management"
    let showingPlaces
    let { query } = this.state
    let { placesList } = this.props
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingPlaces = placesList.filter((place) => match.test(place.title))
    } else {
      showingPlaces = placesList
    }
    // if (showingPlaces.length === 0) {
    //   showingPlaces.push({title: "No items matched your query."})
    // }
    showingPlaces.sort(sortBy('title'))
    // this.props.setMarkerQuery(query, this.props.obj)
    // if (this.props.placesFilter !== showingPlaces) {
    //   this.props.setMarkerList(showingPlaces)
    // }
    return (
      <div className="search-format">
        <input
          className='search-locations'
          type='text'
          placeholder='Search'
          value={query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        <List style={{ maxHeight: '91%', overflow: 'auto' }}>
          {showingPlaces.map((place) => {
            let optionalIcon
            if (place.placeType === 'restaurant') {
              optionalIcon = <Restaurant />
            } else if (place.placeType === 'library') {
              optionalIcon = <LocalLibrary />
            } else if (place.placeType === 'cafe') {
              optionalIcon = <LocalCafe />
            } else if (place.placeType === 'grocery store') {
              optionalIcon = <LocalGroceryStore />
            } else if (place.placeType === 'beach') {
              optionalIcon = <BeachAccess />
            } else if (place.placeType === 'cake') {
              optionalIcon = <Cake />
            } else if (place.placeType === 'school') {
              optionalIcon = <School />
            }
            return (
              <ListItem
                // classes={ 'list-color' }
                key={place.title}
                // hoverColor='#62f442'
                primaryText={place.title}
                rightIcon={optionalIcon}
                // rightIcon={<HomeIcon />}
                onClick={() => {
                  this.props.setCurrentPlace(place.title)
                  this.props.setClicked(true)
                }}
                // style={{ color: 'white', backgroundColor: '#44d6c7' }}
                // onMouseEnter={(e) => e.target.style.backgroundColor = '#495054'}
                // onMouseLeave={(e) => e.target.style.backgroundColor = '#44d6c7'}
              />
            )
          })}
        </List>
      </div>
    )
    // <ListItem
    //   primaryText="Brendan Lim"
    //   leftAvatar={<Avatar src="images/ok-128.jpg" />}
    //   rightIcon={<CommunicationChatBubble />}
    // />
    // <ListItem
    //   primaryText="Eric Hoffman"
    //   leftAvatar={<Avatar src="images/kolage-128.jpg" />}
    //   rightIcon={<CommunicationChatBubble />}
    // />
    // <ListItem
    //   primaryText="Grace Ng"
    //   leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
    //   rightIcon={<CommunicationChatBubble />}
    // />
    // <ListItem
    //   primaryText="Kerem Suer"
    //   leftAvatar={<Avatar src="images/kerem-128.jpg" />}
    //   rightIcon={<CommunicationChatBubble />}
    // />
    // <ListItem
    //   primaryText="Raquel Parrado"
    //   leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
    //   rightIcon={<CommunicationChatBubble />}
    // />
  }

}

export default Search;
