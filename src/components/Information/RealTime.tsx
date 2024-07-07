import style from "../../styles/OilInfo.module.scss";
import RealTimeCard from "./RealTimeCard";

export default function RealTime () {
    return (
        <section className={style.realTimeArea}>
            <div className={style.realTimeAreaGrid}>
                <RealTimeCard title={"engine"} value={1} unit={"km/h"}/>
                <RealTimeCard title={"engine"} value={1} unit={"km/h"}/>
                <RealTimeCard title={"engine"} value={1} unit={"km/h"}/>
                <RealTimeCard title={"engine"} value={1} unit={"km/h"}/>
                <RealTimeCard title={"engine"} value={1} unit={"km/h"}/>
                <RealTimeCard title={"engine"} value={1} unit={"km/h"}/>
                <RealTimeCard title={"engine"} value={1} unit={"km/h"}/>
                <RealTimeCard title={"engine"} value={1} unit={"km/h"}/>
            </div>
        </section>
    )
}