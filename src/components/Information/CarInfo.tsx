import { useContext, useEffect, useState } from "react";

import Chart from "./Chart.tsx";
import Footer from "../Footer.tsx";
import RealTime from "./RealTime.tsx";
import SelectPeriod from "./SelectPeriod.tsx";
import BackButtonContainer from "./BackButtonContainer.tsx";
import { CarInfoContext } from "../Context/CarInfoContextProvider.tsx";
import { connectToELM327 } from "../../libs/communicationToELM327.ts";
import { chartData, initialOilInfoOfHalfYear } from "../../models/chartData.ts";
import style from "../../styles/CarInfo.module.scss";
import TriangleIcon from "../../icons/Triangle.svg";

export default function CarInfo() {
  const {
    setDevice,
    setRpm,
    setSpeed,
    setWaterTemp,
    setOutsideTemp,
    setFuelConsumption,
    setOdo,
    setThrottlePosition,
    setVoltage,
    setTimeFromEngineStart,
    setOilTemp,
    setEngineLoad,
    setAbsolutePressure,
    // setFuelTankLevel,
    // setFuelPressure,
    // setIntakePressure,
    // setAcceleratorPedalPosition,
    // setTorque,
  } = useContext(CarInfoContext);

  const periodItems: string[] = ["Real Time", "Month", "Half Year", "Year"];
  const [viewMode, setViewMode] = useState<string>("Oil Deterioration");
  const [oilInfo, setOilInfo] = useState<chartData[]>(initialOilInfoOfHalfYear);
  const [isSelectedPeriod, setIsSelectedPeriod] = useState<string>("Half Year");

  useEffect(() => {
    if (isSelectedPeriod === "Real Time") {
      const startTime = new Date();
      const interval = setInterval(() => {
        startTime.setSeconds(startTime.getSeconds() + 1);
        const realTimeData = {
          date: `${startTime.getHours().toString().padStart(2, "0")}:${startTime.getMinutes().toString().padStart(2, "0")}:${startTime.getSeconds().toString().padStart(2, "0")}`,
          degree: Math.floor(Math.random() * 100),
        };
        setOilInfo((prevOilInfo) => {
          if (prevOilInfo.length >= 20) {
            return [...prevOilInfo.slice(1), realTimeData];
          }
          return [...prevOilInfo, realTimeData];
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isSelectedPeriod, oilInfo]);

  return (
    <article className={style.container}>
      {viewMode === "Oil Deterioration" && (
        <>
          <BackButtonContainer
            viewMode={viewMode}
            onClickFunc={async () => {
              setViewMode("Monitoring");
              await connectToELM327(
                setDevice,
                setRpm,
                setSpeed,
                setWaterTemp,
                setOutsideTemp,
                setFuelConsumption,
                setOdo,
                setThrottlePosition,
                setVoltage,
                setTimeFromEngineStart,
                setOilTemp,
                setEngineLoad,
                setAbsolutePressure,
                // setFuelTankLevel,
                // setFuelPressure,
                // setIntakePressure,
                // setAcceleratorPedalPosition,
                // setTorque,
              );
            }}
          />
          <div className={style.periodContainer}>
            {periodItems.map((period) => (
              <SelectPeriod
                period={period}
                isSelectedPeriod={isSelectedPeriod}
                setIsSelectedPeriod={setIsSelectedPeriod}
                setOilInfo={setOilInfo}
              />
            ))}
          </div>
          <Chart
            chartData={oilInfo}
            isSelectedPeriod={isSelectedPeriod}
            max={100}
            unit={"％"}
            viewItemName={viewMode}
          />
          {isSelectedPeriod !== "Real Time" && (
            <div
              className={`
              ${style.pointContainer}
              ${(isSelectedPeriod === "Year" || isSelectedPeriod === "Month") && style.pointContainerOfYear}
            `}
              style={{ position: "absolute" }}
            >
              <div>
                {isSelectedPeriod === "Half Year" ||
                isSelectedPeriod === "Real Time"
                  ? "Sep"
                  : "Oct"}
              </div>
              <TriangleIcon />
            </div>
          )}
        </>
      )}
      {(viewMode === "Monitoring" || viewMode === "Real Time Chart") && (
        <>
          <BackButtonContainer
            viewMode={viewMode}
            onClickFunc={() => {
              if (viewMode === "Real Time Chart") {
                setViewMode("Monitoring");
              } else if (viewMode === "Monitoring") {
                setViewMode("Oil Deterioration");
              }
            }}
          />
          <RealTime viewItemName={viewMode} setViewItemName={setViewMode} />
        </>
      )}
      <Footer />
    </article>
  );
}
