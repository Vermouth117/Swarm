import { useLocation, useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { initialOilInfo } from "../models/oilInfo.ts";

export default function OilInfo() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section>
      <button
        onClick={() => {
          navigate("/", { state: { loggedIn: location.state.loggedIn } });
        }}
      >
        戻る
      </button>
      <LineChart
        width={window.innerWidth}
        height={300}
        data={initialOilInfo}
        margin={{
          top: 30,
          right: 50,
          left: 20,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          interval={0}
          angle={-30}
          dy={10}
          tick={{
            fontSize: 10,
          }}
        />
        <YAxis
          dataKey="degree"
          tickCount={7}
          label={{
            value: "Deterioration Rate(%)",
            angle: -90,
            position: "insideBottomLeft",
            offset: 20,
            fill: "#999",
          }}
        />
        <Line
          type="monotone"
          dataKey="degree"
          stroke="#8884d8"
          strokeWidth={2}
        />
        <Tooltip />
      </LineChart>
    </section>
  );
}
