import { Link, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import '../style/Map.css';
import {
	useJsApiLoader,
	GoogleMap,
	DirectionsRenderer,
	MarkerF,
} from '@react-google-maps/api';
import ArrowsBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';

const mapContainerStyle = {
	width: '100vw',
	height: '100vh',
	maxWidth: '600px',
	position: 'fixed',
	left: '50%',
	transform: 'translateX(-50%)',
};

let work = 0;

const Map = () => {
	const { org, dst } = useParams();
	const center = { lat: JSON.parse(org)[0], lng: JSON.parse(org)[1] };
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: 'AIzaSyDFpNHVnzIYrU49unCss65m4uwVe4RrnUo',
	});
	const [directionsResponse, setDirectionsResponse] = useState(null);
	if (!isLoaded) {
		return <div></div>;
	}
	async function calculateRoute() {
		if (work === 3) {
			return;
		}
		// eslint-disable-next-line
		const directionsService = new google.maps.DirectionsService();
		const results = await directionsService.route({
			origin: center,
			destination: { lat: JSON.parse(dst)[0], lng: JSON.parse(dst)[1] },
			// eslint-disable-next-line
			travelMode: google.maps.TravelMode.WALKING,
		});
		setDirectionsResponse(results);
		work = work + 1;
	}
	calculateRoute();
	return directionsResponse ? (
		<div>
			<div className="rectangle">
				<IconButton>
					<Link to={'/about/' + JSON.parse(org)[4]}>
						<ArrowsBackIosIcon
							fontSize="medium"
							style={{
								color: 'white',
							}}
						/>
					</Link>
				</IconButton>
				<p className="title">{JSON.parse(org)[3] + ' route'}</p>
				<div className="currLocation">{JSON.parse(org)[2]}</div>
				<div className="destination">{JSON.parse(dst)[2]}</div>
			</div>
			<GoogleMap
				center={{ lat: JSON.parse(dst)[0], lng: JSON.parse(dst)[1] }}
				zoom={15}
				mapContainerStyle={mapContainerStyle}
				options={{
					zoomControl: false,
					streetViewControl: false,
					mapTypeControl: false,
					fullscreenControl: false,
				}}
			>
				<MarkerF position={center} opacity={0.7} />
				<MarkerF
					position={{ lat: JSON.parse(dst)[0], lng: JSON.parse(dst)[1] }}
				/>
				<DirectionsRenderer
					directions={directionsResponse}
					options={{
						suppressMarkers: true,
						polylineOptions: {
							strokeColor: 'blue',
						},
					}}
				/>
			</GoogleMap>
		</div>
	) : (
		<div></div>
	);
};

export default Map;
