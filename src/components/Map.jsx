import {Link, useParams} from "react-router-dom"
import { IconButton } from "@material-ui/core";
import React, {useState} from 'react'
import '../style/Map.css'
import {useJsApiLoader, GoogleMap, DirectionsRenderer, MarkerF} from '@react-google-maps/api'

let work=0

const Map=() => {
    const {org, dst}=useParams();
    const center={lat: JSON.parse(org)[0], lng:JSON.parse(org)[1]}
    const {isLoaded}=useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })
    const [directionsResponse, setDirectionsResponse] = useState(null)
    if(!isLoaded) {
        return <div></div>
    }
    async function calculateRoute() {
        if(work===3) {
            return
        }
        // eslint-disable-next-line
        const directionsService=new google.maps.DirectionsService()
        const results=await directionsService.route({
            origin: center,
            destination: {lat: JSON.parse(dst)[0], lng:JSON.parse(dst)[1]},
            // eslint-disable-next-line
            travelMode: google.maps.TravelMode.WALKING,
        })
        setDirectionsResponse(results)
        work=work+1
    }
    calculateRoute()
    return directionsResponse? (<div>
        <div className="rectangle">
            <div className="header">
                <Link to="/">
					    <IconButton>
						    <img src="./img/backbutton.png" alt="" />
					    </IconButton>
		        </Link>
                <p>
                    {JSON.parse(org)[3]+' route'}
                </p>
            </div>
            <div className="logo">
            </div>
            <div className="orgRectangle">{JSON.parse(org)[2]}</div>
            <div className="dstRectangle">{JSON.parse(dst)[2]}</div>
        </div>
        <GoogleMap
                center={{lat: JSON.parse(dst)[0], lng:JSON.parse(dst)[1]}}
                zoom={15}
                mapContainerStyle={{width:'100vw', height: '100vh'}}
                options={{
                    zoomControl:false,
                    streetViewControl:false,
                    mapTypeControl:false,
                    fullscreenControl:false,
                }}
         >
            <MarkerF position={center} opacity={0.7}/>
            <MarkerF position={{lat: JSON.parse(dst)[0], lng:JSON.parse(dst)[1]}}/>
            <DirectionsRenderer directions={directionsResponse}
                options={{
                suppressMarkers:true,
                polylineOptions: {
                    strokeColor: 'blue'
                }
            }}/>
         </GoogleMap>
    </div>):<div></div>
}

export default Map;