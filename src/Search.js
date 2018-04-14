import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Search extends Component {
  state = {
    query: '',
    placesList: ["Aquarium", "Becker's Bakery", "The Kettle",
      "California Pizza Kitchen", "Whole Foods", "Ralph's", "Pages",
      "Peet's Coffee & Tea", "Redondo Beach Library", "Martha's",
      "45th Street Beach", "Target", "Islands", "El Sombrero", "Von's",
      "Barnes and Nobles", "Mira Costa High School", "Manhattan Beach Library"]
  }

  // The structure of the controlled component for the search bar is based on the
  // information provided in the 'Building With React, Lesson 3: State Management'
  // videos

  updateQuery = (query) => {
    this.setState({
      query: query
    })
  }

  // <Subheader>Recent chats</Subheader>
  render() {
    // The use of regular expressions and sorting below is based on the
    // information provided in one of the videos in "Introduction To React, Lesson:
    // 3, State Management"
    let showingPlaces
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingPlaces = this.state.placesList.filter((place) => match.test(place))
    } else {
      showingPlaces = this.state.placesList
    }
    if (showingPlaces.length === 0) {
      showingPlaces.push("No items matched your query.")
    }
    return (
      <div className="search-format">
        <input
          className='search-locations'
          type='text'
          placeholder='Search'
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        <List style={{ maxHeight: '91%', overflow: 'auto' }}>
          {showingPlaces.map((place) => (
            <ListItem key={place} primaryText={place}/>
          ))}
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
