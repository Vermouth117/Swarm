import Footer from "./Footer.tsx";
import styles from "../styles/Voice.module.scss"

export default function Voice() {

    return (
        <section>
            <div className={styles.iframeContainer}>
                <iframe
                    src="https://d3b8mr1wm8ww1d.cloudfront.net/"
                    scrolling="no"
                    width="100%"
                    height={window.innerHeight * 0.75}
                    allow="microphone; camera;"
                >
                </iframe>
            </div>
            <Footer/>
        </section>
    );
}
