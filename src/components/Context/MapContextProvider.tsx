import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export type Props = Readonly<{ children: ReactNode }>;

export type MapContextType = Readonly<{
  map: google.maps.Map | undefined;
  setMap: Dispatch<SetStateAction<google.maps.Map | undefined>>;
  places: google.maps.places.PlacesService | undefined;
  setPlaces: Dispatch<
    SetStateAction<google.maps.places.PlacesService | undefined>
  >;
  latLng: { lat: number; lng: number };
  destination: { flag: boolean; latLng: { lat: number; lng: number } };
  setDestination: Dispatch<
    SetStateAction<{
      flag: boolean;
      latLng: { lat: number; lng: number };
    }>
  >;
}>;

export const MapContext = createContext<MapContextType>({
  map: undefined,
  setMap: () => {},
  places: undefined,
  setPlaces: () => {},
  latLng: { lat: 35.170915, lng: 136.881537 },
  destination: { flag: false, latLng: { lat: 35.170915, lng: 136.881537 } },
  setDestination: () => {},
});

export const MapContextProvider: FC<Props> = ({ children }) => {
  const [map, setMap] = useState<google.maps.Map>();
  const [places, setPlaces] = useState<google.maps.places.PlacesService>();
  const [latLng, setLatLng] = useState({ lat: 35.170915, lng: 136.881537 });
  const [destination, setDestination] = useState({
    flag: false,
    latLng: { lat: 35.170915, lng: 136.881537 },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      (_) => setLatLng({ lat: 35.170915, lng: 136.881537 }),
    );
  }, []);

  const value = {
    map,
    setMap,
    places,
    setPlaces,
    latLng: latLng,
    destination,
    setDestination,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
