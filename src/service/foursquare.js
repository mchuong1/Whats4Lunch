import axios from 'axios'

export function getVenuesService(query, latlng){
  const endpoint = "https://api.foursquare.com/v2/venues/explore?"
  const params = {
    client_id: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
    client_secret: process.env.REACT_APP_FOURSQUARE_API_KEY,
    ll: latlng,
    query: query,
    v: "20190101",
    limit: 5,
    openNow: 1
  }
  return axios.get(endpoint + new URLSearchParams(params))
  .then(response => {
    return response.data.response.groups[0].items
  })
  .catch(err => console.log(err))
}

export function getNearbyRestaurants(query) {
  const endpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
  const params = {
    location: this.state.latlong,
    opennow: true,
    key: process.env.REACT_APP_GOOGLE_API_KEY,
    radius: 2000,
    type: 'restaurant',
    query: query
  }
  axios.get(endpoint + new URLSearchParams(params))
  .then(response => {
      console.log(response)
  })
}