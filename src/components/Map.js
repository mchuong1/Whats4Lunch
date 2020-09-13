import React from "react"

export default class Map extends React.Component{
	render(){
		return(
			<div>
				<div id="map" className="map"> </div>
			</div>
		)
	}

	componentDidMount(){
		this.loadMap()
	}

	shouldComponentUpdate(nextProps, nextState){
		if(nextProps.locations !== this.props.locations){ 
			this.loadMap()
		}
		return true 
	}

	loadscript=(url)=>{
		var index = window.document.getElementsByTagName("script")[0]
		var script = window.document.createElement("script")
		script.src = url
		script.async = true
		script.defer = true
		index.parentNode.insertBefore(script, index)
	}
	
	loadMap=()=>{
		this.loadscript("https://maps.googleapis.com/maps/api/js?key="+ process.env.REACT_APP_GOOGLE_API_KEY +"&callback=initMap")
		window.initMap = this.initMap
	}
	//"41.7658923, -72.672725" 777 Main Street
	
	initMap=()=> {
		var map = new window.google.maps.Map(document.getElementById('map'), {
			center: {lat: this.props.lat, lng: this.props.lng},
			zoom: 16
		})

		var marker = new window.google.maps.Marker({
			position: {lat: this.props.lat, lng: this.props.lng}, map: map, 
			label: "You"
		})
		var origin = this.props.lat + ","+ this.props.lng
		var bounds = new window.google.maps.LatLngBounds()
		var infowindow = new window.google.maps.InfoWindow()
		//markers
		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		var markers = this.props.venues.map(function(venue, i) {
			var marker = new window.google.maps.Marker({
				position: {lat:venue.venue.location.lat,lng: venue.venue.location.lng},
				label:labels[i % labels.length],
				map: map
			})

			//infobox
			var directions = "<a href=https://www.google.com/maps/dir/"+origin+ "/" + venue.venue.location.address +" target=\"_blank\">Directions</a>"
			var contentString = "<div><h3>"+ venue.venue.name+"</h3><p>"+venue.venue.location.address+ ","+venue.venue.location.formattedAddress[1]+"\n" +directions+"</p></div>"
			// var infowindow = new window.google.maps.InfoWindow({
			// content: contentString
			// });
			
			//eventListeners
			window.google.maps.event.addListener(marker, 'click', function(event){
					infowindow.setContent(contentString)
					infowindow.open(map, marker)
			})
			window.google.maps.event.addListener(marker, 'dblclick', function(event){
					this.map.setZoom(20)
					this.map.setCenter(marker.getPosition())
			})
			
			//recenters
			bounds.extend(marker.getPosition())
			map.fitBounds(bounds)
			return marker
		})
	}


}