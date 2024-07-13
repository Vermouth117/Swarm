import Footer from "../Footer.tsx";
import SearchBox from "./SearchBox.tsx";
import MapComponent from "./MapComponent.tsx";
import styles from "../../styles/Map.module.css";

export default function Map() {
  return (
    <article>
      <div className={styles.mapArea} style={{ position: "relative" }}>
        <SearchBox />
        <MapComponent />
      </div>
      <Footer />
    </article>
  );
}
