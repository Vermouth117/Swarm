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
import { sendCommandInterval } from "../../libs/communicationToELM327.ts";
import style from "../../styles/CarInfo.module.scss";

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

  const [showChartCat, setShowChartCat] = useState<string>();

  useEffect(() => {
    (async () => {
      if (device) {
        sendCommandInterval(device, "010C", 100);
        sendCommandInterval(device, "010D", 113);
        sendCommandInterval(device, "0105", 131);
        sendCommandInterval(device, "0146", 149);
        sendCommandInterval(device, "0110", 163);
        sendCommandInterval(device, "01A6", 179);
        sendCommandInterval(device, "0145", 191);
        sendCommandInterval(device, "0142", 211);
        sendCommandInterval(device, "011F", 223);
        sendCommandInterval(device, "015C", 233);
        sendCommandInterval(device, "0104", 251);
        sendCommandInterval(device, "0133", 263);
      }
    })();
  }, [device]);

  return (
    <section className={style.realTimeArea}>
      {viewItemName === "Monitoring" && (
        <div className={style.realTimeAreaGrid}>
          <RealTimeCard
            title={"Engine"}
            value={(rpm && rpm![rpm!.length - 1].degree) || 0}
            unit={"rpm"}
            setViewItemName={setViewItemName}
            setShowChartCat={setShowChartCat}
          />
          <RealTimeCard
            title={"Speed"}
            value={(speed && speed![speed.length - 1].degree) || 0}
            unit={"km/h"}
            setViewItemName={setViewItemName}
            setShowChartCat={setShowChartCat}
          />
          <RealTimeCard
            title={"Water temp"}
            value={waterTemp || 0}
            unit={"℃"}
            setViewItemName={setViewItemName}
          />
          <RealTimeCard
            title={"Outside temp"}
            value={outsideTemp || 0}
            unit={"℃"}
            setViewItemName={setViewItemName}
          />
          <RealTimeCard
            title={"Fuel consumption"}
            value={fuelConsumption || 0}
            unit={"L/h"}
            setViewItemName={setViewItemName}
          />
          <RealTimeCard
            title={"ODO"}
            value={odo || 0}
            unit={"km"}
            setViewItemName={setViewItemName}
          />
          <RealTimeCard
            title={"Throttle position"}
            value={throttlePosition || 0}
            unit={"％"}
            setViewItemName={setViewItemName}
          />
          <RealTimeCard
            title={"Voltage"}
            value={voltage || 0}
            unit={"V"}
            setViewItemName={setViewItemName}
          />
          <RealTimeCard
            title={"Time from engine start"}
            value={timeFromEngineStart || 0}
            unit={"sec"}
            setViewItemName={setViewItemName}
          />
          <RealTimeCard
            title={"Oil temp"}
            value={oilTemp || 0}
            unit={"℃"}
            setViewItemName={setViewItemName}
          />
          <RealTimeCard
            title={"Engine load"}
            value={engineLoad || 0}
            unit={"％"}
            setViewItemName={setViewItemName}
          />
          <RealTimeCard
            title={"Absolute pressure"}
            value={absolutePressure || 0}
            unit={"kPa"}
            setViewItemName={setViewItemName}
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
      {viewItemName === "Real Time Chart" && (
        <>
          {showChartCat === "Engine" && (
            <Chart
              chartData={rpm!}
              isSelectedPeriod={"Real Time"}
              max={4000}
              unit={"rpm"}
              viewItemName={viewItemName}
            />
          )}
          {showChartCat === "Speed" && (
            <Chart
              chartData={speed!}
              isSelectedPeriod={"Real Time"}
              max={140}
              unit={"km/h"}
              viewItemName={viewItemName}
            />
          )}
        </>
      )}
    </section>
  );
}
