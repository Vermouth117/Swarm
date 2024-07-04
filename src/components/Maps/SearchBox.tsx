import styles from "../../styles/Map.module.css";

export default function SearchBox () {
    return (
        <section className={styles.searchboxArea}>
            <label htmlFor="">
                <input type="text" name="search" id="mapsearch" autoComplete="mapSearch" />
            </label>
        </section>    
    )
}