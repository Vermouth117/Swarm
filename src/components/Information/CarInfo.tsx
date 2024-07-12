import { useContext, useEffect, useState } from "react";

import Chart from "./Chart.tsx";
import Footer from "../Footer.tsx";
import RealTime from "./RealTime.tsx";
import SelectPeriod from "./SelectPeriod.tsx";
import { CarInfoContext } from "../Context/CarInfoContextProvider.tsx";
import { connectToELM327 } from "../../libs/communicationToELM327.ts";
import { chartData, initialOilInfoOfHalfYear } from "../../models/chartData.ts";
import style from "../../styles/OilInfo.module.scss";
import TriangleIcon from "../../icons/Triangle.svg";
import ChevronLeftIcon from "../../icons/ChevronLeft.svg";

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
    <section className={style.container}>
      {(viewMode === "Monitoring" || viewMode === "Real Time Chart") && (
        <>
          <div
            className={style.backButtonContainer}
            style={{ position: "absolute" }}
            onClick={() => {
              if (viewMode === "Real Time Chart") {
                setViewMode("Monitoring");
              } else {
                setViewMode("Oil Deterioration");
              }
            }}
          >
            <ChevronLeftIcon />
            {viewMode === "Monitoring" && (
              <div className={style.backButton}>Oil Deterioration</div>
            )}
            {viewMode === "Real Time Chart" && (
              <div className={style.backButton}>Monitoring</div>
            )}
          </div>
          <RealTime viewItemName={viewMode} setViewItemName={setViewMode} />
        </>
      )}
      {viewMode === "Oil Deterioration" && (
        <>
          <div
            className={style.backButtonContainer}
            style={{ position: "absolute" }}
            onClick={async () => {
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
          >
            <ChevronLeftIcon />
            <div className={style.backButton}>Monitoring</div>
          </div>
          <div className={style.periodContainer}>
            <SelectPeriod
              period={"Real Time"}
              isSelectedPeriod={isSelectedPeriod}
              setIsSelectedPeriod={setIsSelectedPeriod}
              setOilInfo={setOilInfo}
            />
            <SelectPeriod
              period={"Month"}
              isSelectedPeriod={isSelectedPeriod}
              setIsSelectedPeriod={setIsSelectedPeriod}
              setOilInfo={setOilInfo}
            />
            <SelectPeriod
              period={"Half Year"}
              isSelectedPeriod={isSelectedPeriod}
              setIsSelectedPeriod={setIsSelectedPeriod}
              setOilInfo={setOilInfo}
            />
            <SelectPeriod
              period={"Year"}
              isSelectedPeriod={isSelectedPeriod}
              setIsSelectedPeriod={setIsSelectedPeriod}
              setOilInfo={setOilInfo}
            />
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
      <Footer />
    </section>
  );
}
