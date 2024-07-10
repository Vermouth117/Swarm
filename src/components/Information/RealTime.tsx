import { useContext, useEffect } from "react";

import RealTimeCard from "./RealTimeCard.tsx";
import { CarInfoContext } from "../Context/CarInfoContextProvider.tsx";
import { sendCommand } from "../../libs/communicationToELM327.ts";
import style from "../../styles/OilInfo.module.scss";

export default function RealTime() {
  const {
    device,
    rpm,
    speed,
    waterTemp,
    outsideTemp,
    fuelConsumption,
    odo,
    throttlePosition,
    voltage,
    timeFromEngineStart,
    oilTemp,
    engineLoad,
    fuelTankLevel,
    fuelPressure,
    intakePressure,
    absolutePressure,
    acceleratorPedalPosition,
    torque,
  } = useContext(CarInfoContext);

  useEffect(() => {
    (async () => {
      if (device) {
        setInterval(async () => {
          await sendCommand(device, "010C");
          await sendCommand(device, "010D");
          await sendCommand(device, "0105");
          await sendCommand(device, "0146");
          await sendCommand(device, "0110");
          await sendCommand(device, "01A6");
          await sendCommand(device, "0145");
          await sendCommand(device, "0142");
          await sendCommand(device, "011F");
          await sendCommand(device, "015C");
          await sendCommand(device, "0104");
          await sendCommand(device, "012F");
          await sendCommand(device, "0123");
          await sendCommand(device, "010B");
          await sendCommand(device, "0133");
          await sendCommand(device, "015A");
          await sendCommand(device, "0199");
        }, 1000);
      }
    })();
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
        <RealTimeCard
          title={"Throttle position"}
          value={throttlePosition || 0}
          unit={"％"}
        />
        <RealTimeCard title={"Voltage"} value={voltage || 0} unit={"V"} />
        <RealTimeCard
          title={"Time from engine start"}
          value={timeFromEngineStart || 0}
          unit={"sec"}
        />
        <RealTimeCard title={"Oil temp"} value={oilTemp || 0} unit={"℃"} />
        <RealTimeCard
          title={"Engine load"}
          value={engineLoad || 0}
          unit={"％"}
        />
        <RealTimeCard
          title={"Fuel pressure"}
          value={fuelPressure || 0}
          unit={"kPa"}
        />
        <RealTimeCard
          title={"Absolute pressure"}
          value={absolutePressure || 0}
          unit={"kPa"}
        />
        <RealTimeCard
          title={"Intake pressure"}
          value={intakePressure || 0}
          unit={"kPa"}
        />
        <RealTimeCard
          title={"Fuel tank level"}
          value={fuelTankLevel || 0}
          unit={"％"}
        />
        <RealTimeCard
          title={"Accel pedal position"}
          value={acceleratorPedalPosition || 0}
          unit={"％"}
        />
        <RealTimeCard title={"Torque"} value={torque || 0} unit={"Nm"} />
      </div>
    </section>
  );
}
