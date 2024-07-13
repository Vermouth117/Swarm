import style from "../../styles/CarInfo.module.scss";
import ChevronLeftIcon from "../../icons/ChevronLeft.svg";

type Props = {
  viewMode: string;
  onClickFunc: () => void;
};

export default function BackButtonContainer({ viewMode, onClickFunc }: Props) {
  return (
    <div
      className={style.backButtonContainer}
      style={{ position: "absolute" }}
      onClick={onClickFunc}
    >
      <ChevronLeftIcon />
      {viewMode === "Monitoring" && (
        <div className={style.backButton}>Oil Deterioration</div>
      )}
      {(viewMode === "Real Time Chart" || viewMode === "Oil Deterioration") && (
        <div className={style.backButton}>Monitoring</div>
      )}
    </div>
  );
}
