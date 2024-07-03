import Footer from "../Footer.tsx";
import styles from "../../styles/Map.module.css";
import MapComponent from "./MapComponent.tsx";

export default function Map() {
  return (
    <section>
      <div className={styles.mapArea}>
        <MapComponent/>
      </div>
      <Footer />
    </section>
  );
}
