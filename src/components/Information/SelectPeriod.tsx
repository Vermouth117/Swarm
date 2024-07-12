import { Dispatch, SetStateAction } from "react";

import {
  chartData,
  initialOilInfoOfHalfYear,
  oilInfoOfYear,
} from "../../models/chartData.ts";
import style from "../../styles/OilInfo.module.scss";

type Props = {
  period: string;
  isSelectedPeriod: string;
  setIsSelectedPeriod: Dispatch<SetStateAction<string>>;
  setOilInfo: Dispatch<SetStateAction<chartData[]>>;
};

export default function SelectPeriod({
  period,
  isSelectedPeriod,
  setIsSelectedPeriod,
  setOilInfo,
}: Props) {
  const update = () => {
    setIsSelectedPeriod(period);
    if (period === "Year" || period === "Month") {
      setOilInfo(oilInfoOfYear);
    } else if (period === "Half Year") {
      setOilInfo(initialOilInfoOfHalfYear);
    } else {
      setOilInfo([]);
    }
  };

  return (
    <div
      className={style.underline}
      onClick={update}
      aria-selected={isSelectedPeriod === period}
    >
      {period}
    </div>
  );
}
