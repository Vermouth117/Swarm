import Footer from "./Footer.tsx";
import styles from "../styles/Voice.module.scss";

const isLocal = import.meta.env.VITE_APP_ISLOCAL;

export default function Voice() {
  return (
    <article className={styles.iframeSection}>
      <div>
        <iframe
          src={
            isLocal
              ? "http://localhost:5200"
              : "https://dvgi3dgexiavz.cloudfront.net/"
          }
          scrolling="no"
          width="100%"
          height={window.innerHeight - 170}
          allow="microphone; camera;"
          frameBorder="none"
        ></iframe>
      </div>
      <Footer />
    </article>
  );
}
