import { useContext, useEffect } from "react";

import RealTimeCard from "./RealTimeCard.tsx";
import { CarInfoContext } from "../Context/CarInfoContextProvider.tsx";
import { sendCommand } from "../../libs/communicationToELM327.ts";
import style from "../../styles/OilInfo.module.scss";

export default function RealTime() {
  const { device, rpm, waterTemp, outsideTemp, fuelConsumption, odo, speed } =
    useContext(CarInfoContext);

  useEffect(() => {
    device &&
      setInterval(async () => {
        await sendCommand(device, "010C");
        await sendCommand(device, "010D");
        await sendCommand(device, "0105");
        await sendCommand(device, "0146");
        await sendCommand(device, "0110");
        await sendCommand(device, "01A6");
      }, 1000);
  }, [device]);

  return (
    <section className={style.realTimeArea}>
      <div className={style.realTimeAreaGrid}>
        <RealTimeCard title={"Engine"} value={rpm || 0} unit={"rpm"} />
        <RealTimeCard title={"Speed"} value={speed || 0} unit={"km/h"} />
        <RealTimeCard title={"Water temp"} value={waterTemp || 0} unit={"℃"} />
        <RealTimeCard
          title={"Outside temp"}
          value={outsideTemp || 0}
          unit={"℃"}
        />
        <RealTimeCard
          title={"Fuel consumption"}
          value={fuelConsumption || 0}
          unit={"L/h"}
        />
        <RealTimeCard title={"ODO"} value={odo || 0} unit={"km"} />
      </div>
    </section>
  );
}
