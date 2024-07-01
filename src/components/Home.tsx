import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  return (
    <section className={style.container}>
      <SideBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className={`${style.greeting} ${loggedIn && style.fadeOut}`}>
        Hello
      </div>
      <div className={`${style.userName} ${loggedIn && style.fadeOut}`}>
        MMMTMN
      </div>
      <div
        className={`${style.rockIconContainer} ${loggedIn && style.fadeOut}`}
        style={{ position: "relative" }}
        onClick={() => {
          setLoggedIn(true);
          navigate("/", { state: { loggedIn: true } });
        }}
      >
        <RockRipplesIcon style={{ position: "absolute" }} />
        <RockIcon style={{ position: "absolute" }} />
      </div>
      <img
        src={"PriusC.png"}
        alt={"PRIUS-Cの写真"}
        className={`${style.carImage} ${loggedIn && style.slide}`}
        style={{ position: "relative" }}
      />
    </section>
  );
}
