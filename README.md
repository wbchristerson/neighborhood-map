# Neighborhood Map

This project includes a neighborhood map of Manhattan Beach, California along with information about several venues there including local restaurants, ocean-related sites, and stores. The project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and in turn developed using `React`. The map feature used in the application was obtained via `react-google-maps`, an application that integrates `React` with Google Maps. In turn, that software was itself based on [Google Maps API](https://developers.google.com/maps/). Documentation about `react-google-maps` can be found [here](https://github.com/tomchentw/react-google-maps). In addition, the street views for markers that were used were obtained with the [street view feature](https://developers.google.com/maps/documentation/javascript/streetview) of Google Maps, also through `react-google-maps`. Data about the included venues were extracted using the [Foursquare API](https://developer.foursquare.com/).

Users begin with a map of the neighborhood together with a list view of venues. A search feature allows the user to filter this list and upon clicking any item, the user is taken to the chosen venue's item page, detailing information about the location, hours of operation, busy times of the week and day, a photo view, contact information, customer tips, and more. Clicking on the corresponding marker on the map will open a street view of the premises. Markers on the map are filtered in accordance with the filtered query and will animate/bounce when the corresponding item is clicked. Additional features include error handling for failed API requests, responsive design for mobile devices, accessibility features for motor- and visually-impaired users in the form of controlled focus, ARIA roles, and alternate image text, and finally, a service worker to cache the data of visited pages in the event of a poor network connection.

## Downloading The Project

* To download, you can clone the repository using this terminal command:
```
git clone https://github.com/wbchristerson/neighborhood-map.git
```

Alternatively, follow the instructions below to download to a hard drive:
* Click the green "Clone or download" button above then choose "Download ZIP".
* Find the folder `neighborhood-map-master` in your Downloads folder or wherever it was placed on your device.
* Right click and choose "Extract All".

* To install all dependencies for the project from the command line, run the following commands in the terminal:
    - `cd neighborhood-map`
    - `npm install`
* Assuming that your location in the terminal is now within the `neighborhood-map` directory, run the following command to execute the application:
    - `npm start`

(I believe that `yarn start` will also be sufficient.)

The page will open in the browser.
