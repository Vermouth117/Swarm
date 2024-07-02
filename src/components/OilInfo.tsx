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

export default function OilInfo() {
  return (
    <section className={style.container}>
      <LineChart
        width={window.innerWidth}
        height={300}
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
          tick={{ stroke: "#6C6C6C", strokeWidth: 0.5, fontSize: 15 }}
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
            x1="87.5"
            y1="-21.5"
            x2="81"
            y2="210"
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
      <Footer />
    </section>
  );
}
