import { ReactNode, useState, createContext, useEffect } from 'react';

export type Props = Readonly<{children: ReactNode}>;
export type MapContextType = Readonly<{
    map: google.maps.Map | undefined
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | undefined>>
    places: google.maps.places.PlacesService | undefined
    setPlaces: React.Dispatch<React.SetStateAction<google.maps.places.PlacesService | undefined>>
    latlng: {lat:number,lng:number}
    destination: {flag:boolean,latlng:{lat:number,lng:number}}
    setDestination: React.Dispatch<React.SetStateAction<{flag:boolean,latlng:{lat:number,lng:number}}>>
}>;

export const MapContext = createContext<MapContextType>({
    map: undefined,
    setMap: ()=>{},
    places: undefined,
    setPlaces: ()=>{},
    latlng: {lat:35.170915,lng:136.881537},
    destination: {flag:false,latlng:{lat:35.170915,lng:136.881537}},
    setDestination: ()=>{},
});

export const MapContextProvider:React.FC<Props> = ({children}) => {
    const [map, setMap] = useState<google.maps.Map>();
    const [places, setPlaces] = useState<google.maps.places.PlacesService>();
    const [latlng, setLatLng] = useState({lat:35.170915,lng:136.881537});
    const [destination, setDestination] = useState({flag:false,latlng:{lat:35.170915,lng:136.881537}});

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            position=>setLatLng({lat: position.coords.latitude,lng: position.coords.longitude}),
            _=>setLatLng({lat:35.170915,lng:136.881537})
        );
    },[]);

    const value = { map, setMap, places, setPlaces, latlng, destination, setDestination }

    return (
        <MapContext.Provider value={value}>
            {children}
        </MapContext.Provider>
    );
}