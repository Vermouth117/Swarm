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

  const [loggedIn, setLoggedIn] = useState<boolean>(
    location.state ? !!location.state.loggedIn : false,
  );

  return (
    <article className={style.container}>
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
    </article>
  );
}
