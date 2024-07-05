import { DirectionsRenderer, DirectionsService, MarkerF } from "@react-google-maps/api";
import { useCallback, useContext, useState } from "react";
import { MapContext } from "../Context/MapContextProvider";
import { endMarkerProp } from "../../models/mapIcons";


export default function Directions ({isLoaded}:any) {
    const { map, latlng, destination } = useContext(MapContext);
    const [currentDirection, setCurrentDirection] = useState<google.maps.DirectionsResult|null>(null);

    const options = {
        origin: latlng,
        destination: destination["latlng"],
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true
    };

    const DirectionsServiceCallback = useCallback((googleResponse:any) => {
        if (googleResponse && isLoaded && destination["flag"]) {
            if (currentDirection) {
                if (googleResponse.status === "OK" && googleResponse.geocoded_waypoints.length!==currentDirection.geocoded_waypoints!.length ) {
                    console.log("ルートが変更されたのでstateを更新する");
                    setCurrentDirection(googleResponse);
                }else {
                    console.log("前回と同じルートのためstateを更新しない");
                }
            } else {
                if (googleResponse.status==="OK") {
                    console.log("初めてルートが設定されたため、stateを更新する");
                    (!Boolean(currentDirection)) && setCurrentDirection(googleResponse);
                } else {
                    console.log("前回と同じルートのためstateを更新しない");
                }   
            }
        } 
    },[currentDirection,destination])

    return (
        <>
        {isLoaded && destination["flag"] && <MarkerF position={destination["latlng"]} icon={{...endMarkerProp, scaledSize: new google.maps.Size(35, 35)}} />}
        <DirectionsService options={options} callback={DirectionsServiceCallback}/>
        {
            currentDirection!==null && 
            <>
            <div style={{zIndex:"100",width:"100px",height:"100px"}}>ssss</div>
            <DirectionsRenderer options={{map:map,suppressMarkers:true,preserveViewport:true}} directions={currentDirection!} />
            </>
        }
        </>
    )
}