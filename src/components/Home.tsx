import { useState } from "react";

import Header from "./Header.tsx";
import SideBar from "./SideBar.tsx";
import style from "../styles/Home.module.scss";
import RockIcon from "../../public/icons/Rock.svg?react";
import RockRipplesIcon from "../../public/icons/RockRipples.svg?react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <section className={style.container}>
      <Header />
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
        onClick={() => setLoggedIn(true)}
      >
        <RockRipplesIcon style={{ position: "absolute" }} />
        <RockIcon style={{ position: "absolute" }} />
      </div>
      <img
        src={"/images/PriusC.png"}
        alt={"PRIUS-Cの写真"}
        className={`${style.carImage} ${loggedIn && style.slide}`}
        style={{ position: "relative" }}
      />
    </section>
  );
}
