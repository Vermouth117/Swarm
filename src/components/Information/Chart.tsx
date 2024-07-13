import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { chartData } from "../../models/chartData.ts";

type Props = {
  chartData: chartData[];
  isSelectedPeriod?: string;
  max: number;
  unit: string;
  viewItemName: string;
};

export default function Chart({
  chartData,
  isSelectedPeriod,
  max,
  unit,
  viewItemName,
}: Props) {
  return (
    <LineChart
      width={window.innerWidth}
      height={
        viewItemName === "Oil Deterioration"
          ? window.innerHeight - 93 - 81 - 60 - 60
          : window.innerHeight - 93 - 81 - 60
      }
      data={chartData}
      margin={{
        top: viewItemName === "Oil Deterioration" ? 0 : 30,
        left: 20,
        right: 20,
        bottom: viewItemName === "Oil Deterioration" ? 80 : 20,
      }}
    >
      <XAxis
        dataKey="date"
        interval={
          isSelectedPeriod !== "Real Time"
            ? Math.round(chartData.length / 7)
            : 5
        }
        padding={{ left: 20, right: -25 }}
        tickLine={false}
        tick={{ stroke: "#6C6C6C", strokeWidth: 0.5, fontSize: 13 }}
        tickMargin={viewItemName === "Oil Deterioration" ? 65 : 30}
      />
      <YAxis
        dataKey="degree"
        orientation={"right"}
        tickCount={3}
        domain={[0, max]}
        axisLine={false}
        tickLine={false}
        tick={{ stroke: "#6C6C6C", strokeWidth: 0.5, fontSize: 13 }}
        unit={unit}
        tickMargin={10}
      />
      <CartesianGrid vertical={false} stroke={"#E7E7E7"} />
      <Tooltip />
      <defs>
        <linearGradient
          id="gradationColor"
          x1="0"
          y1="0"
          x2="0"
          y2="250"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FA5252" />
          <stop offset="1" stopColor="#3D39EA" />
        </linearGradient>
      </defs>
      <Line
        type="monotone"
        dataKey="degree"
        dot={false}
        stroke="url(#gradationColor)"
        strokeWidth={4}
        strokeLinecap="round"
        unit={unit}
        isAnimationActive={isSelectedPeriod !== "Real Time"}
      />
    </LineChart>
  );
}
