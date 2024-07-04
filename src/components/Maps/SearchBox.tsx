import { useState } from "react";
import styles from "../../styles/Map.module.css";

export default function SearchBox () {
    const [inputText, setInputText] = useState<string>("");

    return (
        <section className={styles.searchboxArea}>
            <label htmlFor="">
                <input type="text" name="search" id="mapsearch" autoComplete="mapSearch" 
                 value={inputText} onChange={e=>setInputText(e.target.value)} />
            </label>
            <img src="/icons/X.svg" alt="X" className={styles.searchboxX}/>
        </section>    
    )
}