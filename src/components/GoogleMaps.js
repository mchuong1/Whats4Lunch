import React from 'react'
import GoogleMapsReact from 'google-map-react'

export default class GoogleMaps extends React.Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div style={{width:"100vw", height: "100vh"}}>
        <GoogleMapsReact
          
        >

        </GoogleMapsReact>
      </div>
    )
  }
}