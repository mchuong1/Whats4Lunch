import React from 'react'
import GoogleMapsReact from 'google-map-react'
import Marker from './Marker'

export default class GoogleMaps extends React.Component{
  constructor(){
    super()
    this.state = {
      center: {
        lat: 59.95,
        lng: 30.33
      }
    }
  }

  render(){
    return(
      <div className="map">
        <GoogleMapsReact
          bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_API_KEY}}
          defaultCenter={this.state.center}
          defaultZoom={11}
        >
          <Marker 
            lat={59.955413}
            lng={30.337844}
          />
        </GoogleMapsReact>
      </div>
    )
  }
}