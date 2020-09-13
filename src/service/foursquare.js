import axios from 'axios'

export function getVenuesService(query, latlng){
  const endpoint = "https://api.foursquare.com/v2/venues/explore?"
  const params = {
    client_id: "MBDW52IQNZDUMKO4LXYXNLDGNNSAEBY4KMGNTSHCNKPO1ZXQ",
    client_secret: "Y2DLAVALWAYU5TYZUIORUPN21HRNZPQGO0VVOWN15REYC4OB",
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
    key: "AIzaSyCn5XAF4sSSjnjEVvWd8yB-nAyG8YOIb0o",
    radius: 2000,
    type: 'restaurant',
    query: query
  }
  axios.get(endpoint + new URLSearchParams(params))
  .then(response => {
      console.log(response)
  })
}