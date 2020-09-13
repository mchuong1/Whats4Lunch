import React from 'react'
import marker from '../icons/marker.png'

export default class Marker extends React.Component{
  constructor(){
    super()
  }

  showInfoBox = () => {
    
  }

  render(){
    return(
      <div className="marker">
        <div className="none infobox">
          <span>InfoBox</span>
        </div>
        <img alt="" src={marker} className="markerIcon" onClick={this.showInfoBox}></img>
      </div>
    )
  }
}