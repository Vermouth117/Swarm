import { useContext, useState } from "react";

import { MapContext } from "../Context/MapContextProvider.tsx";
import styles from "../../styles/Map.module.css";

export default function SearchBox() {
  const { map, setDestination } = useContext(MapContext);

  const [inputText, setInputText] = useState<string>("");

  return (
    <section className={styles.searchBoxArea} style={{ position: "absolute" }}>
      <label htmlFor="">
        <input
          type="text"
          name="search"
          id="mapsearch"
          placeholder="where are you go?"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </label>
      {inputText.length !== 0 ? (
        <img
          src="/icons/search.svg"
          alt="search"
          className={styles.searchBoxX}
          onClick={() => {
            setDestination((prev) => ({ ...prev, flag: false }));
            const geocoder = new google.maps.Geocoder();
            geocoder
              .geocode({ address: inputText })
              .then((res) => {
                const lat = res.results[0].geometry.location.lat();
                const lng = res.results[0].geometry.location.lng();
                setDestination({ flag: true, latLng: { lat: lat, lng: lng } });
                map!.setCenter({ lat, lng });
              })
              .catch((_) => alert("目的地が見つかりません"));
          }}
        />
      ) : (
        <img
          src="/icons/X.svg"
          alt="X"
          className={styles.searchBoxX}
          style={{ position: "absolute" }}
          onClick={(_) => {
            setInputText("");
            setDestination((prev) => ({ ...prev, flag: false }));
          }}
        />
      )}
    </section>
  );
}
