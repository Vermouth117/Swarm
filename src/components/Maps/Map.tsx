import Footer from "../Footer.tsx";
import styles from "../../styles/Map.module.css";
import MapComponent from "./MapComponent.tsx";
import SearchBox from "./SearchBox.tsx";

export default function Map() {
  return (
    <section>
      <div className={styles.mapArea}>
        <SearchBox/>
        <MapComponent/>
      </div>
      <Footer />
    </section>
  );
}
