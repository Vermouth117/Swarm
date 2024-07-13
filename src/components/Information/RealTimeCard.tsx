import { Dispatch, SetStateAction } from "react";

import style from "../../styles/CarInfo.module.scss";

type Props = {
  title: string;
  value: number;
  unit: string;
  setViewItemName: Dispatch<SetStateAction<string>>;
  setShowChartCat?: Dispatch<SetStateAction<string | undefined>>;
};

export default function RealTimeCard({
  title,
  value,
  unit,
  setViewItemName,
  setShowChartCat,
}: Props) {
  return (
    <section
      className={style.RealTimeCard}
      style={{ position: "relative" }}
      onClick={() => {
        setViewItemName("Real Time Chart");
        setShowChartCat && setShowChartCat(title);
      }}
    >
      <div className={style.RealTimeCardTitle}>{title}</div>
      <div className={style.RealTimeCardValue}>{value}</div>
      <div className={style.RealTimeCardUnit}>{unit}</div>
      <div className={style.chevronRightIcon} style={{ position: "absolute" }}>
        <img src="/icons/left.svg" alt="left" />
      </div>
    </section>
  );
}
