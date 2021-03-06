import React from "react"
import Place from "./Place";
import Map from "./Map";
import { getVenuesService } from '../service/foursquare'
import hamburger from '../icons/hamburger.png'

export default class Places extends React.Component {
	constructor() {
		super()
		this.state = {
			latlong: "",
			venues: [],
			query: "",
			lat: 0,
			lng: 0,
			locations: []
		}
	}

	render() {
		return (
			<div>
				<div className="Place">
					<ul className="header">
						<form onSubmit={this.searchForNearbyVenues}>
							<img className="main-icon" alt="hamburger" src={hamburger}/>
							<span className="title">Whats4Lunch</span>
							<input
								id="query"
								className="query-input"
								type="text"
								placeholder="Coffee, sushi, pizza, etc..."
								onChange={this.updateQuery}
								autoFocus
							/>
							<button id="submit" className="submit-button">Let's Eat!</button>
							{this.state.venues.map(venue => {
								return <li key={venue.venue.id}>
										<Place venue={venue.venue} lat={this.state.lat} lng={this.state.lng} />
								</li>
							})}
						</form>
					</ul>
					<Map lat={this.state.lat} lng={this.state.lng} locations={this.state.locations} venues={this.state.venues} />
				</div>
			</div>
		)
	}
	componentDidMount() {
		this.getLocation(); //turn this into a user response
	}
	searchForNearbyVenues = (e) => {
		e.preventDefault()
		this.setState({ locations: [] })
		getVenuesService(this.state.query, this.state.latlong)
		.then(response => this.setState({venues: response}))
		.then(this.logLocations)
	}
	updateQuery = (event) => {
		this.setState({query: event.target.value})
	}
	getLocation = () => {
		navigator.geolocation.getCurrentPosition(response => {
			this.setState({
				latlong: response.coords.latitude + ", " + response.coords.longitude,
				lat: response.coords.latitude,
				lng: response.coords.longitude
			})
		})
	}
	logLocations = () => {
		this.state.venues.map(venue => {
			return this.setState({
				locations: this.state.locations.concat({ lat: venue.venue.location.lat, lng: venue.venue.location.lng })
			})
		})
	}
}