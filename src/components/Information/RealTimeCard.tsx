import style from "../../styles/OilInfo.module.scss";

type Props = {
  title: string;
  value: number;
  unit: string;
};

export default function RealTimeCard({ title, value, unit }: Props) {
  return (
    <article className={style.RealTimeCard}>
      <div className={style.RealTimeCardTitle}>{title}</div>
      <div className={style.RealTimeCardValue}>{value}</div>
      <div className={style.RealTimeCardUnit}>{unit}</div>
      <div className={style.chevronRightIcon}>
        <img src="/icons/left.svg" alt="left" />
      </div>
    </article>
  );
}
