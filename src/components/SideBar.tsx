import { useEffect, useState } from "react";

import { SideBarProps } from "../models/SideBarProps.ts";
import { carInfo, initialCarInfo } from "../models/carInfo.ts";
import style from "../styles/SideBar.module.scss";
import HomeIcon from "../../public/icons/Home.svg?react";
import OilStainsBG from "../../public/icons/OilStainsBG.svg?react";
import OilStainsRipplesBig from "../../public/icons/OilStainsRipplesBig.svg?react";
import OilStainsRipplesSmall from "../../public/icons/OilStainsRipplesSmall.svg?react";

export default function SideBar({ loggedIn, setLoggedIn }: SideBarProps) {
  const [carInfo, setCarInfo] = useState<carInfo>(initialCarInfo);

  useEffect(() => {
    (async () => {
      setCarInfo({
        temperature: 32,
        mileage: 11111,
        oilStains: 62,
        speed: 45,
      });
    })();
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
            {carInfo.temperature}
          </div>
          <div className={style.itemName}>気温</div>
        </div>
        <div className={style.itemContainer}>
          <div
            className={`${style.item} ${style.mileage}`}
            style={{ position: "relative" }}
          >
            {carInfo.mileage}
          </div>
          <div className={style.itemName}>走行距離</div>
        </div>
        <div className={style.itemContainer} style={{ position: "relative" }}>
          <div className={style.oilStains}>
            <OilStainsRipplesBig style={{ position: "absolute" }} />
            <OilStainsRipplesSmall style={{ position: "absolute" }} />
            <OilStainsBG style={{ position: "absolute" }} />
            <div style={{ position: "absolute" }}>
              {carInfo.oilStains}
              <span>％</span>
            </div>
          </div>
        </div>
        <div className={style.itemContainer}>
          <div
            className={`${style.item} ${style.speed}`}
            style={{ position: "relative" }}
          >
            {carInfo.speed}
          </div>
          <div className={style.itemName}>SPEED</div>
        </div>
        <div className={style.homeIcon} onClick={() => setLoggedIn(false)}>
          <HomeIcon />
        </div>
      </section>
    </aside>
  );
}
