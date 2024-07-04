import { useContext, useState } from "react";
import styles from "../../styles/Map.module.css";
import { MapContext } from "../Context/MapContextProvider";

export default function SearchBox () {
    const [inputText, setInputText] = useState<string>("");
    const { map, setDestination } = useContext(MapContext);

    const searech = ()=>{
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: inputText}).then(res=>{
            const lat = res.results[0].geometry.location.lat()
            const lng = res.results[0].geometry.location.lng()
            setDestination({flag:true, latlng:{lat,lng}});
            map!.setCenter({lat,lng});
        }).catch(_=>alert("目的地が見つかりません"));
    };

    return (
        <section className={styles.searchboxArea}>
            <label htmlFor="">
                <input type="text" name="search" id="mapsearch" placeholder="where are you go?" 
                 value={inputText} onChange={e=>setInputText(e.target.value)} />
            </label>
            {inputText.length!==0
                ? <img src="/icons/search.svg" alt="search" className={styles.searchboxX} onClick={searech}/>
                : <img src="/icons/X.svg" alt="X" className={styles.searchboxX} onClick={_=>{setInputText("");setDestination((prev:any)=>({...prev,flag:false}))}}/>
            }
        </section>    
    )
}