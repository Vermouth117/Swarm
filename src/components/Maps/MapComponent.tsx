import { useContext } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import Directions from "./Directions.tsx";
import { MapContext } from "../Context/MapContextProvider.tsx";
import { startMarkerProp } from "../../models/mapIcons.ts";

export default function MapComponent() {
  const { setMap, latLng } = useContext(MapContext);

  const { isLoaded } = useJsApiLoader({
    id: "google-map",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "visualization"],
    language: "ja",
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={15}
          center={latLng}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {isLoaded && (
            <MarkerF
              position={latLng}
              icon={{
                ...startMarkerProp,
                scaledSize: new google.maps.Size(40, 40),
              }}
            />
          )}
          {isLoaded && <Directions isLoaded={isLoaded} />}
        </GoogleMap>
      )}
    </>
  );
}
