import { useLocation, useNavigate } from "react-router-dom";

import style from "../styles/Footer.module.scss";
import HomeIcon from "../icons/Home.svg";
import GraphIcon from "../icons/Graph.svg";
import MicrophoneIcon from "../icons/Microphone.svg";
import DestinationIcon from "../icons/Destination.svg";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer
      className={`
        ${style.container}
        ${location.state && location.state.loggedIn && style.fadeIn}
        ${location.pathname !== "/" ? style.borderTopOn : style.borderTopOff}
      `}
    >
      <div className={style.icon}>
        <HomeIcon
          style={location.pathname === "/" ? { opacity: 0 } : { opacity: 1 }}
          onClick={() => {
            navigate("/", { state: { loggedIn: location.state.loggedIn } });
          }}
        />
      </div>

      <div
        className={style.icon}
        aria-selected={location.pathname === "/oilInfo"}
      >
        <GraphIcon
          onClick={() => {
            navigate("/oilInfo", {
              state: { loggedIn: location.state.loggedIn },
            });
          }}
        />
      </div>
      <div className={style.icon} aria-selected={location.pathname === "/map"}>
        <DestinationIcon
          onClick={() => {
            navigate("/map", {
              state: { loggedIn: location.state.loggedIn },
            });
          }}
        />
      </div>
      <div
        className={style.icon}
        aria-selected={location.pathname === "/voice"}
      >
        <MicrophoneIcon
          onClick={() => {
            navigate("/voice", {
              state: { loggedIn: location.state.loggedIn },
            });
          }}
        />
      </div>
    </footer>
  );
}
