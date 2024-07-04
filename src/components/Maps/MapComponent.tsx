import { GoogleMap, useJsApiLoader, Libraries } from "@react-google-maps/api";
import { useContext } from "react";
import { MapContext } from "../Context/MapContextProvider";

const mapStyle = {width: "100%", height: "100%"};
export const libraries:Libraries = (['places','visualization']);
export const options:google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl:false
}

export default function MapComponent () {
    const { latlang } = useContext(MapContext);

    const { isLoaded } = useJsApiLoader({
        id: "google-map",
        googleMapsApiKey:import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: libraries,
        language:"ja"
    });

    return (
    <>
    { isLoaded && 
        <GoogleMap mapContainerStyle={mapStyle} zoom={15} center={latlang} options={options} >
            
        </GoogleMap>
    }
    </>
    )
}