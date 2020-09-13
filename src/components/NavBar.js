import React from 'react'
import Place from './Place'
import { getVenuesService } from '../service/foursquare'

export default class NavBar extends React.Component{
	constructor(){
		super()
	}

	searchForNearbyVenues = (e) => {
		e.preventDefault()
		this.setState({ locations: [] })
		getVenuesService(this.state.query, this.state.latlong)
		.then(response => this.setState({venues: response}))
		.then(this.logLocations)
	}

	updateQuery = (event) => {
		console.log(event.target.value)
		this.setState({
				query: event.target.value
		})
	}

	logLocations = () => {
		this.state.venues.map(venue => {
				return this.setState({
						locations: this.state.locations.concat({ lat: venue.venue.location.lat, lng: venue.venue.location.lng })
				})
		})
	}

	render(){
		return(
			<ul className="header">
				<form onSubmit={this.searchForNearbyVenues}>
					<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4VdmZk_mf-XHIQ9iPcDGDIv-SuiY9PYlANTeagAP0kWu-t3CMbw"/>
					<li>Whats4Lunch</li>
					<input
						id="query"
						type="text"
						placeholder="Coffee, sushi, pizza, etc..."
						onChange={this.updateQuery}
						autoFocus
					/>
					<button id="submit">Let's Eat!</button>
					{this.state.venues.map(venue => {
						return <li key={venue.venue.id}>
							<Place venue={venue.venue} lat={this.state.lat} lng={this.state.lng} />
						</li>
					})}
				</form>
			</ul>
	)}
}