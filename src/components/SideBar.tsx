import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SideBarProps } from "../models/SideBarProps.ts";
import { CarInfoContext } from "./Context/CarInfoContextProvider.tsx";
import style from "../styles/SideBar.module.scss";
import HomeIcon from "../icons/Home.svg";
import OilStainsRipplesBig from "../icons/OilStainsRipplesBig.svg";
import OilStainsRipplesSmall from "../icons/OilStainsRipplesSmall.svg";

export default function SideBar({ loggedIn, setLoggedIn }: SideBarProps) {
  const navigate = useNavigate();

  const { speed, outsideTemp, odo } = useContext(CarInfoContext);

  const [oilStainsNum, setOilStainsNum] = useState<number>(0);
  useEffect(() => {
    setOilStainsNum(68);
  }, []);

  return (
    <aside
      className={`${style.sideBar} ${loggedIn && style.slide}`}
      style={{ position: "absolute", zIndex: "1" }}
    >
      <section className={style.sideBarContainer}>
        <div className={style.itemContainer}>
          <div
            className={`${style.item} ${style.temperature}`}
            style={{ position: "relative" }}
          >
            {outsideTemp || 31}
          </div>
          <div className={style.itemName}>Temp</div>
        </div>
        <div className={style.itemContainer}>
          <div
            className={`${style.item} ${style.mileage}`}
            style={{ position: "relative" }}
          >
            {odo || 98117}
          </div>
          <div className={style.itemName}>Mileage</div>
        </div>
        <div className={style.itemContainer} style={{ position: "relative" }}>
          <div className={style.oilStains}>
            <div style={{ position: "absolute" }}>
              <OilStainsRipplesBig />
            </div>
            <div style={{ position: "absolute" }}>
              <OilStainsRipplesSmall />
            </div>
            <div
              className={style.circle}
              style={{
                position: "absolute",
                background: `linear-gradient(white, white, #E65000 ${-2 * oilStainsNum + 200}%)`,
              }}
            ></div>
            <div
              className={style.oilStainsNum}
              style={{ position: "absolute" }}
            >
              {oilStainsNum}
              <span>％</span>
            </div>
          </div>
        </div>
        <div className={style.itemContainer}>
          <div
            className={`${style.item} ${style.speed}`}
            style={{ position: "relative" }}
          >
            {speed || 0}
          </div>
          <div className={style.itemName}>Speed</div>
        </div>
        <div
          className={style.homeIcon}
          onClick={() => {
            setLoggedIn(false);
            navigate("/", { state: { loggedIn: false } });
          }}
        >
          <HomeIcon />
        </div>
      </section>
    </aside>
  );
}
