import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

import { initialOilInfoOfHalfYear, oilInfo } from "../../models/oilInfo.ts";
import Footer from "../Footer.tsx";
import style from "../../styles/OilInfo.module.scss";
import TriangleIcon from "../../icons/Triangle.svg";
import ChevronLeftIcon from "../../icons/ChevronLeft.svg";
import SelectPeriod from "./SelectPeriod.tsx";
import RealTime from "./RealTime.tsx";

export default function OilInfo() {
  // const navigate = useNavigate();
  // const location = useLocation();

  const [isSelectedPeriod, setIsSelectedPeriod] = useState<string>("Half Year");
  const [oilInfo, setOilInfo] = useState<oilInfo[]>(initialOilInfoOfHalfYear);
  const [flag, setFlag] = useState(false)

  return (
    <section className={style.container}>
      {flag
      ? <>
        <div className={style.backButtonContainer} style={{ position: "absolute" }} onClick={_ => setFlag(false)}>
          <ChevronLeftIcon />
          <div className={style.backButton}>Oil Deterioration</div>
        </div>
        <RealTime />
        </>
      : <>
        <div className={style.backButtonContainer} style={{ position: "absolute" }} onClick={_ => setFlag(true)} >
          {/* onClick={() => {navigate("/", { state: { loggedIn: location.state.loggedIn } })}}  */}
          <ChevronLeftIcon />
          <div className={style.backButton}>Monitorring</div>
        </div>
        <div className={style.periodContainer}>
          <SelectPeriod period={"Real Time"} isSelectedPeriod={isSelectedPeriod} setIsSelectedPeriod={setIsSelectedPeriod} setOilInfo={setOilInfo} />
          <SelectPeriod period={"Month"}     isSelectedPeriod={isSelectedPeriod} setIsSelectedPeriod={setIsSelectedPeriod} setOilInfo={setOilInfo} />
          <SelectPeriod period={"Half Year"} isSelectedPeriod={isSelectedPeriod} setIsSelectedPeriod={setIsSelectedPeriod} setOilInfo={setOilInfo} />
          <SelectPeriod period={"Year"}      isSelectedPeriod={isSelectedPeriod} setIsSelectedPeriod={setIsSelectedPeriod} setOilInfo={setOilInfo} />
        </div>
        <LineChart
          width={window.innerWidth}
          height={window.innerHeight - 93 - 81 - 60 - 16 - 60 - 16 - 30}
          data={oilInfo}
          margin={{
            left: 20,
            right: 20,
            bottom: 65,
          }}>
          <XAxis
            dataKey="date"
            interval={Math.round(oilInfo.length / 7)}
            padding={{ left: 20, right: -25 }}
            tickLine={false}
            tick={{ stroke: "#6C6C6C", strokeWidth: 0.5, fontSize: 13 }}
            tickMargin={65}/>
          <YAxis
            dataKey="degree"
            orientation={"right"}
            tickCount={3}
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ stroke: "#6C6C6C", strokeWidth: 0.5, fontSize: 13 }}
            unit={"%"}
            tickMargin={10} />
          <CartesianGrid vertical={false} stroke={"#E7E7E7"} />
          <Tooltip />
          <defs>
            <linearGradient
              id="gradationColor"
              x1="90"
              y1="-30"
              x2="80"
              y2="400"
              gradientUnits="userSpaceOnUse">
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
            unit={"%"} />
        </LineChart>
        <div
          className={`
              ${style.pointContainer}
              ${(isSelectedPeriod === "Year" || isSelectedPeriod === "Month") && style.pointContainerOfYear}
            `}
          style={{ position: "absolute" }} >
          <div>
            {isSelectedPeriod==="Half Year"||isSelectedPeriod==="Week" ? "Sep" : "Oct"}
          </div>
          <TriangleIcon />
        </div>
       </>
      }
      <Footer />
    </section>
  );
}
