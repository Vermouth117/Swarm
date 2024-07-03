import { ReactNode, useState, createContext, useEffect } from 'react';

export type Props = Readonly<{children: ReactNode}>;
export type MapContextType = Readonly<{
    map: google.maps.Map | undefined
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | undefined>>
    places: google.maps.places.PlacesService | undefined
    setPlaces: React.Dispatch<React.SetStateAction<google.maps.places.PlacesService | undefined>>
    latlang: {lat:number,lng:number}
}>;

export const MapContext = createContext<any>({
    map: undefined,
    setMap: ()=>{},
    places: undefined,
    setPlaces: ()=>{},
    latlang: {lat:35.170915,lng:136.881537}
});

export const MapContextProvider:React.FC<Props> = ({children}) => {
    const [map, setMap] = useState<google.maps.Map>();
    const [places, setPlaces] = useState<google.maps.places.PlacesService>();
    const [latlang, setLatLang] = useState({lat:35.170915,lng:136.881537});

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            position=>setLatLang({lat: position.coords.latitude,lng: position.coords.longitude}),
            _=>setLatLang({lat:35.170915,lng:136.881537})
        )
    },[]);

    const value = { map, setMap, places, setPlaces, latlang }

    return (
        <MapContext.Provider value={value}>
            {children}
        </MapContext.Provider>
    );
}