import React from 'react'
import Place from './Place'
import axios from 'axios'

export default class NavBar extends React.Component{
	constructor(){
		super()
		this.state = {
			venues: [],
			locations: []
		}
	}

	handleClick = (e) => {
		e.preventDefault()
		this.setState({ locations: [] })
		this.getVenues(this.state.query)
		this.getNearby(this.state.query)
	}

	handleChange = (event) => {
		console.log(event.target.value)
		this.setState({
				query: event.target.value
		})
	}

	getVenues = (query) => {
		const endpoint = "https://api.foursquare.com/v2/venues/explore?"
		const params = {
				client_id: "MBDW52IQNZDUMKO4LXYXNLDGNNSAEBY4KMGNTSHCNKPO1ZXQ",
				client_secret: "Y2DLAVALWAYU5TYZUIORUPN21HRNZPQGO0VVOWN15REYC4OB",
				ll: this.state.latlong,
				query: query,
				v: "20190101",
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

	getNearby = (query) => {
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
				<form onSubmit={this.handleClick}>
					<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4VdmZk_mf-XHIQ9iPcDGDIv-SuiY9PYlANTeagAP0kWu-t3CMbw"/>
					<li>Whats4Lunch</li>
					<input
						id="query"
						type="text"
						placeholder="Coffee, sushi, pizza, etc..."
						onChange={this.handleChange}
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