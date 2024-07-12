import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import Chart from "./Chart.tsx";
import RealTimeCard from "./RealTimeCard.tsx";
import { CarInfoContext } from "../Context/CarInfoContextProvider.tsx";
import { sendCommand } from "../../libs/communicationToELM327.ts";
import style from "../../styles/OilInfo.module.scss";

type Props = {
  viewItemName: string;
  setViewItemName: Dispatch<SetStateAction<string>>;
};

export default function RealTime({ viewItemName, setViewItemName }: Props) {
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
    absolutePressure,
    // fuelTankLevel,
    // fuelPressure,
    // intakePressure,
    // acceleratorPedalPosition,
    // torque,
  } = useContext(CarInfoContext);

  const [showRpmChart, setShowRpmChart] = useState<boolean>(false);

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
          await sendCommand(device, "0133");
          // await sendCommand(device, "012F");
          // await sendCommand(device, "0123");
          // await sendCommand(device, "010B");
          // await sendCommand(device, "015A");
          // await sendCommand(device, "0199");
        }, 500);
      }
    })();
  }, [device]);

  return (
    <section className={style.realTimeArea}>
      {viewItemName === "Monitoring" && (
        <div className={style.realTimeAreaGrid}>
          <div
            onClick={() => {
              setViewItemName("Real Time Chart");
              setShowRpmChart(true);
            }}
          >
            <RealTimeCard
              title={"Engine"}
              value={(rpm && rpm![rpm!.length - 1].degree) || 0}
              unit={"rpm"}
            />
          </div>
          <RealTimeCard title={"Speed"} value={speed || 0} unit={"km/h"} />
          <RealTimeCard
            title={"Water temp"}
            value={waterTemp || 0}
            unit={"℃"}
          />
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
            title={"Absolute pressure"}
            value={absolutePressure || 0}
            unit={"kPa"}
          />
          {/*<RealTimeCard*/}
          {/*  title={"Fuel tank level"}*/}
          {/*  value={fuelTankLevel || 0}*/}
          {/*  unit={"％"}*/}
          {/*/>*/}
          {/*<RealTimeCard*/}
          {/*  title={"Fuel pressure"}*/}
          {/*  value={fuelPressure || 0}*/}
          {/*  unit={"kPa"}*/}
          {/*/>*/}
          {/*<RealTimeCard*/}
          {/*  title={"Intake pressure"}*/}
          {/*  value={intakePressure || 0}*/}
          {/*  unit={"kPa"}*/}
          {/*/>*/}
          {/*<RealTimeCard*/}
          {/*  title={"Accel pedal position"}*/}
          {/*  value={acceleratorPedalPosition || 0}*/}
          {/*  unit={"％"}*/}
          {/*/>*/}
          {/*<RealTimeCard title={"Torque"} value={torque || 0} unit={"Nm"} />*/}
        </div>
      )}
      {showRpmChart && (
        <Chart
          chartData={rpm!}
          isSelectedPeriod={"Real Time"}
          max={4000}
          unit={"rpm"}
          viewItemName={viewItemName}
        />
      )}
    </section>
  );
}
