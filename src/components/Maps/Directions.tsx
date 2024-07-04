import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { useCallback, useContext, useState } from "react";
import { MapContext } from "../Context/MapContextProvider";

export default function Directions () {
    const { latlng, destination } = useContext(MapContext);
    const [target, setTarget] = useState<google.maps.DirectionsResult|null>();
    const [options, setOptions] = useState({
        origin: latlng,
        destination: destination["latlng"],
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false
    });

    const DirectionsServiceCallback = useCallback((res:google.maps.DirectionsResult|null) => {
        destination["flag"]===true && 
        setOptions({
            origin: latlng,
            destination: destination["latlng"],
            travelMode: google.maps.TravelMode.DRIVING,
            optimizeWaypoints: false
        });
        destination["flag"] && setTarget(res)
    },[destination])

    return (
        <>
        <DirectionsService options={options} callback={DirectionsServiceCallback}/>
        {
            destination["flag"] && 
            <DirectionsRenderer options={{directions:target,suppressMarkers:true,preserveViewport:true}}/>
        }
        </>
    )
}