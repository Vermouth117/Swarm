import { useContext, useState } from "react"; // import { useLocation, useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Footer from "../Footer.tsx";
import RealTime from "./RealTime.tsx";
import SelectPeriod from "./SelectPeriod.tsx";
import { CarInfoContext } from "../Context/CarInfoContextProvider.tsx";
import { connectToELM327 } from "../../libs/communicationToELM327.ts";
import { initialOilInfoOfHalfYear, oilInfo } from "../../models/oilInfo.ts";
import style from "../../styles/OilInfo.module.scss";
import TriangleIcon from "../../icons/Triangle.svg";
import ChevronLeftIcon from "../../icons/ChevronLeft.svg";

export default function OilInfo() {
  // const navigate = useNavigate();
  // const location = useLocation();

  const [flag, setFlag] = useState(false);
  const [oilInfo, setOilInfo] = useState<oilInfo[]>(initialOilInfoOfHalfYear);
  const [isSelectedPeriod, setIsSelectedPeriod] = useState<string>("Half Year");

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
    setFuelTankLevel,
    setFuelPressure,
    setIntakePressure,
    setAbsolutePressure,
    setAcceleratorPedalPosition,
    setTorque,
  } = useContext(CarInfoContext);

  return (
    <section className={style.container}>
      {flag ? (
        <>
          <div
            className={style.backButtonContainer}
            style={{ position: "absolute" }}
            onClick={() => setFlag(false)}
          >
            <ChevronLeftIcon />
            <div className={style.backButton}>Oil Deterioration</div>
          </div>
          <RealTime />
        </>
      ) : (
        <>
          <div
            className={style.backButtonContainer}
            style={{ position: "absolute" }}
            onClick={async () => {
              setFlag(true);
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
                setFuelTankLevel,
                setFuelPressure,
                setIntakePressure,
                setAbsolutePressure,
                setAcceleratorPedalPosition,
                setTorque,
              );
            }}
          >
            {/* onClick={() => {navigate("/", { state: { loggedIn: location.state.loggedIn } })}}  */}
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
          <LineChart
            width={window.innerWidth}
            height={window.innerHeight - 93 - 81 - 60 - 60}
            data={oilInfo}
            margin={{
              left: 20,
              right: 20,
              bottom: 80,
            }}
          >
            <XAxis
              dataKey="date"
              interval={Math.round(oilInfo.length / 7)}
              padding={{ left: 20, right: -25 }}
              tickLine={false}
              tick={{ stroke: "#6C6C6C", strokeWidth: 0.5, fontSize: 13 }}
              tickMargin={65}
            />
            <YAxis
              dataKey="degree"
              orientation={"right"}
              tickCount={3}
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ stroke: "#6C6C6C", strokeWidth: 0.5, fontSize: 13 }}
              unit={"%"}
              tickMargin={10}
            />
            <CartesianGrid vertical={false} stroke={"#E7E7E7"} />
            <Tooltip />
            <defs>
              <linearGradient
                id="gradationColor"
                x1="50"
                y1="-50"
                x2="50"
                y2="200"
                // x1="90"
                // y1="-30"
                // x2="80"
                // y2="400"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3D39EA" />
                <stop offset="1" stopColor="#FA5252" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="degree"
              dot={false}
              stroke="url(#gradationColor)"
              strokeWidth={4}
              strokeLinecap="round"
              unit={"%"}
            />
          </LineChart>
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
        </>
      )}
      <Footer />
    </section>
  );
}
