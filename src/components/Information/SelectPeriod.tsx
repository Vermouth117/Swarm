import { Dispatch, SetStateAction } from "react";

import {
  initialOilInfoOfHalfYear,
  oilInfo,
  oilInfoOfYear,
} from "../../models/oilInfo.ts";
import style from "../../styles/OilInfo.module.scss";

export type props = {
  period: string;
  isSelectedPeriod: string;
  setIsSelectedPeriod: Dispatch<SetStateAction<string>>;
  setOilInfo: Dispatch<SetStateAction<oilInfo[]>>;
};

export default function SelectPeriod({
  period,
  isSelectedPeriod,
  setIsSelectedPeriod,
  setOilInfo,
}: props) {
  const update = () => {
    setIsSelectedPeriod(period);
    setOilInfo(
      period === "Year" || period === "Month"
        ? oilInfoOfYear
        : initialOilInfoOfHalfYear,
    );
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
