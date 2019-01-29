import React from "react"
import Place from "./Place";
import Map from "./Map";
import axios from "axios";

class Places extends React.Component {
    constructor(){
        super()
        this.state = {
            latlong: "",
            venues: [],
            query: "",
            lat: 0,
            lng: 0,
            locations:[],
            isMap: false
        }
    }
    render(){
        let mapBar = null;
        if(this.state.isMap){ 
            mapBar = <Map lat={this.state.lat} lng={this.state.lng} locations={this.state.locations}/>
        }
        return(
            <div className="Place">
            <nav className="Navbar">
                <h1>Whats4Lunch</h1>
                <h3>Hungry? Let's look for something to eat!</h3>
                <form onSubmit={this.handleClick}>
                <input 
                    id="query" 
                    type="text" 
                    placeholder="Coffee, sushi, pizza, etc..." 
                    onChange={this.handleChange}
                    autoFocus
                    />
                <button id="submit">Let's Eat!</button>
                </form>
            </nav>
                <br/>
                <ul>
                {this.state.venues.map(venue=>{
                    return <li key={venue.venue.id}> 
                    <Place venue={venue.venue} lat={this.state.lat} lng={this.state.lng}/>
                    </li>  
                })}
                </ul>
                <Map lat={this.state.lat} lng={this.state.lng} locations={this.state.locations} venues={this.state.venues}/>
            </div>
        )
    }

    componentDidMount(){
        this.getLocation(); //turn this into a user response
    }

    handleClick=(e)=>{
        e.preventDefault()
        this.setState({locations:[]})
        this.getVenues(this.state.query)
    }

    handleChange=(event)=>{
        console.log(event.target.value)
        this.setState({
            query:event.target.value
        })
    }

    getLocation = () => {
        navigator.geolocation.getCurrentPosition(response => {
            console.log(response.coords)
            this.setState({
                latlong: response.coords.latitude + ", " + response.coords.longitude,
                lat:response.coords.latitude,
                lng:response.coords.longitude
            })
        })
    }

    getVenues = (query) => {
        const endpoint = "https://api.foursquare.com/v2/venues/explore?"
        const params = {
            client_id: "MBDW52IQNZDUMKO4LXYXNLDGNNSAEBY4KMGNTSHCNKPO1ZXQ",
            client_secret: "Y2DLAVALWAYU5TYZUIORUPN21HRNZPQGO0VVOWN15REYC4OB",
            ll: this.state.latlong, 
            query: query,
            v:"20190101",
            limit: 5,
            openNow: 1
        }
        axios.get(endpoint + new URLSearchParams(params))
        .then(response => {
            console.log(response.data.response.groups[0].items)
            this.setState({
                venues: response.data.response.groups[0].items
            }) //end out setState
        })
        .then(response => {
            this.logLocations()
            this.setState({
                isMap: true
            })
        })
    }

    logLocations=()=>{
        this.state.venues.map(venue=>{
          return this.setState({
                locations: this.state.locations.concat({lat:venue.venue.location.lat, lng:venue.venue.location.lng})
            })
        })
    }

    testFunction(string){
        console.log("Places sending: " + string)
    }
}

export default Places