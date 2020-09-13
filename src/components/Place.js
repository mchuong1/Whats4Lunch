import React from "react"
//import axios from "axios"

class Place extends React.Component{
    render(){
        return(
            <div className="Places">
                <a href="javascript:void(0)">{this.props.venue.name}</a>
            </div>
        )
    }

    //used later for directions
    /*getDirections=()=>{
        var endpoint="https://maps.googleapis.com/maps/api/directions/json?"
        var params={
            key:"AIzaSyCn5XAF4sSSjnjEVvWd8yB-nAyG8YOIb0o",
            origin: "" + this.props.lat + "," + this.props.lng,
            destination:"" + this.props.venue.location.lat + ", " + this.props.venue.location.lng,
            travelMode: 'DRIVING',
            headers: {
                AccessControlAllowOrigin: '*',
                AccessControlAllowMethods: 'GET'
            }
        }
        axios.get(endpoint + new URLSearchParams(params),{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data.routes[0].legs[0])
        })
    }*/
}

export default Place