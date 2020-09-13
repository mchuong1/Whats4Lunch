import React from "react"
//import axios from "axios"

class Place extends React.Component{
    render(){
        return(
            <div className="Place">
                <span>{this.props.venue.name}</span>
            </div>
        )
    }

    //used later for directions
    /*getDirections=()=>{
        var endpoint="https://maps.googleapis.com/maps/api/directions/json?"
        var params={
            key:process.env.REACT_APP_GOOGLE_API_KEY,
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