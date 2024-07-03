import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Footer from "./Footer.tsx";
import { initialOilInfo } from "../models/oilInfo.ts";
import style from "../styles/OilInfo.module.scss";
import TriangleIcon from "../icons/Triangle.svg";
import ChevronLeftIcon from "../icons/ChevronLeft.svg";

export default function OilInfo() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSelectedPeriod, setIsSelectedPeriod] = useState("Half Year");

  return (
    <section className={style.container}>
      <div
        className={style.backButtonContainer}
        style={{ position: "absolute" }}
        onClick={() => {
          navigate("/", {
            state: { loggedIn: location.state.loggedIn },
          });
        }}
      >
        <ChevronLeftIcon />
        <div className={style.backButton}>Oil Deterioration</div>
      </div>
      <div className={style.periodContainer}>
        <div
          className={style.underline}
          onClick={() => setIsSelectedPeriod("Week")}
          aria-selected={isSelectedPeriod === "Week"}
        >
          Week
        </div>
        <div
          className={style.underline}
          onClick={() => setIsSelectedPeriod("Month")}
          aria-selected={isSelectedPeriod === "Month"}
        >
          Month
        </div>
        <div
          className={style.underline}
          onClick={() => setIsSelectedPeriod("Half Year")}
          aria-selected={isSelectedPeriod === "Half Year"}
        >
          Half Year
        </div>
        <div
          className={style.underline}
          onClick={() => setIsSelectedPeriod("Year")}
          aria-selected={isSelectedPeriod === "Year"}
        >
          Year
        </div>
      </div>
      <LineChart
        width={window.innerWidth}
        height={window.innerHeight - 93 - 81 - 60 - 16 - 60 - 16 - 30}
        data={initialOilInfo}
        margin={{
          left: 20,
          right: 20,
          bottom: 65,
        }}
      >
        <XAxis
          dataKey="date"
          interval={4}
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
            x1="90"
            y1="-30"
            x2="80"
            y2="400"
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
      <div className={style.pointContainer} style={{ position: "absolute" }}>
        <div>Sep</div>
        <TriangleIcon />
      </div>
      <Footer />
    </section>
  );
}
