import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Footer from "./Footer.tsx";
import SideBar from "./SideBar.tsx";
import style from "../styles/Home.module.scss";
import RockIcon from "../icons/Rock.svg";
import RockRipplesIcon from "../icons/RockRipples.svg";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(
    location.state ? !!location.state.loggedIn : false,
  );

  // const {
  //   device,
  //   setDevice,
  //   rpm,
  //   setRpm,
  //   speed,
  //   setSpeed,
  //   waterTemp,
  //   setWaterTemp,
  //   outsideTemp,
  //   setOutsideTemp,
  //   fuelConsumption,
  //   setFuelConsumption,
  //   odo,
  //   setOdo,
  //   throttlePosition,
  //   setThrottlePosition,
  //   voltage,
  //   setVoltage,
  //   timeFromEngineStart,
  //   setTimeFromEngineStart,
  //   oilTemp,
  //   setOilTemp,
  // } = useContext(CarInfoContext);

  return (
    <section className={style.container}>
      {/*<div>*/}
      {/*  <h1>OBD2 ELM327 Bluetooth</h1>*/}
      {/*  {device ? (*/}
      {/*    <p>接続中のデバイス: {device.name}</p>*/}
      {/*  ) : (*/}
      {/*    <button*/}
      {/*      onClick={() =>*/}
      {/*        connectToELM327(*/}
      {/*          setDevice,*/}
      {/*          setRpm,*/}
      {/*          setSpeed,*/}
      {/*          setWaterTemp,*/}
      {/*          setOutsideTemp,*/}
      {/*          setFuelConsumption,*/}
      {/*          setOdo,*/}
      {/*          setThrottlePosition,*/}
      {/*          setVoltage,*/}
      {/*          setTimeFromEngineStart,*/}
      {/*          setOilTemp,*/}
      {/*        )*/}
      {/*      }*/}
      {/*    >*/}
      {/*      ELM327に接続*/}
      {/*    </button>*/}
      {/*  )}*/}
      {/*  <button onClick={() => sendCommand(device!, "010C")}>*/}
      {/*    エンジン回転数*/}
      {/*  </button>*/}
      {/*  {rpm && <div>Engine RPM: {rpm}</div>}*/}
      {/*  <button onClick={() => sendCommand(device!, "010D")}>スピード</button>*/}
      {/*  {speed && <div>Speed: {speed}</div>}*/}
      {/*  <button onClick={() => sendCommand(device!, "0105")}>水温</button>*/}
      {/*  {waterTemp && <div>水温: {waterTemp}</div>}*/}
      {/*  <button onClick={() => sendCommand(device!, "0146")}>外気温</button>*/}
      {/*  {outsideTemp && <div>外気温: {outsideTemp}</div>}*/}
      {/*  <button onClick={() => sendCommand(device!, "0110")}>燃料消費量</button>*/}
      {/*  {fuelConsumption && <div>燃料消費量: {fuelConsumption}</div>}*/}
      {/*  <button onClick={() => sendCommand(device!, "01A6")}>走行距離</button>*/}
      {/*  {odo && <div>ODO: {odo}</div>}*/}
      {/*  <button onClick={() => sendCommand(device!, "0145")}>*/}
      {/*    スロットル位置*/}
      {/*  </button>*/}
      {/*  {throttlePosition && <div>スロットル位置: {throttlePosition}</div>}*/}
      {/*  <button onClick={() => sendCommand(device!, "0166")}>電圧</button>*/}
      {/*  {voltage && <div>電圧: {voltage}</div>}*/}
      {/*  <button onClick={() => sendCommand(device!, "011F")}>*/}
      {/*    エンジン始動時間*/}
      {/*  </button>*/}
      {/*  {timeFromEngineStart && (*/}
      {/*    <div>エンジン始動時間: {timeFromEngineStart}</div>*/}
      {/*  )}*/}
      {/*  <button onClick={() => sendCommand(device!, "015C")}>油温</button>*/}
      {/*  {oilTemp && <div>油温: {oilTemp}</div>}*/}
      {/*</div>*/}
      <SideBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className={`${style.greeting} ${loggedIn && style.fadeOut}`}>
        Hello
      </div>
      <div className={`${style.userName} ${loggedIn && style.fadeOut}`}>
        Kento Izumi
      </div>
      <div
        className={`${style.rockIconContainer} ${loggedIn && style.fadeOut}`}
        style={{ position: "relative" }}
        onClick={() => {
          setLoggedIn(true);
          navigate("/", { state: { loggedIn: true } });
        }}
      >
        <div style={{ position: "absolute" }}>
          <RockRipplesIcon />
        </div>
        <div style={{ position: "absolute" }}>
          <RockIcon />
        </div>
      </div>
      <div
        className={`
          ${style.carImageContainer}
          ${loggedIn && `${style.fadeIn} ${style.slide}`}
        `}
        style={{ position: "relative" }}
      >
        <img
          src={"/images/PriusC.png"}
          alt={"PRIUS-Cの写真"}
          className={`${style.carImage}`}
        />
      </div>
      <Footer />
    </section>
  );
}
