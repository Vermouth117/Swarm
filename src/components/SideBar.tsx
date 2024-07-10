import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SideBarProps } from "../models/SideBarProps.ts";
import { CarInfoContext } from "./Context/CarInfoContextProvider.tsx";
import style from "../styles/SideBar.module.scss";
import HomeIcon from "../icons/Home.svg";
import OilStainsBG from "../icons/OilStainsBG.svg";
import OilStainsRipplesBig from "../icons/OilStainsRipplesBig.svg";
import OilStainsRipplesSmall from "../icons/OilStainsRipplesSmall.svg";

export default function SideBar({ loggedIn, setLoggedIn }: SideBarProps) {
  const navigate = useNavigate();

  const { speed, outsideTemp, odo } = useContext(CarInfoContext);

  // const [carInfo, setCarInfo] = useState<carInfo>(initialCarInfo);

  // useEffect(() => {
  //   (async () => {
  //     setCarInfo({
  //       temperature: 32,
  //       mileage: 11111,
  //       oilStains: 62,
  //       speed: 45,
  //     });
  //   })();
  // }, []);

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
            {/*{carInfo.temperature}*/}
          </div>
          <div className={style.itemName}>気温</div>
        </div>
        <div className={style.itemContainer}>
          <div
            className={`${style.item} ${style.mileage}`}
            style={{ position: "relative" }}
          >
            {odo || 98117}
            {/*{carInfo.mileage}*/}
          </div>
          <div className={style.itemName}>走行距離</div>
        </div>
        <div className={style.itemContainer} style={{ position: "relative" }}>
          <div className={style.oilStains}>
            <div style={{ position: "absolute" }}>
              <OilStainsRipplesBig />
            </div>
            <div style={{ position: "absolute" }}>
              <OilStainsRipplesSmall />
            </div>
            <div style={{ position: "absolute" }}>
              <OilStainsBG />
            </div>
            <div
              className={style.oilStainsNum}
              style={{ position: "absolute" }}
            >
              48
              {/*{carInfo.oilStains}*/}
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
            {/*{carInfo.speed}*/}
          </div>
          <div className={style.itemName}>SPEED</div>
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
