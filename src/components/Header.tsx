import style from "../styles/Header.module.scss";
import CircleMenuIcon from "../../public/icons/CircleMenu.svg?react";

export default function Header() {
  return (
    <header className={style.container}>
      <CircleMenuIcon />
      <h1>TOYOTA</h1>
      <div className={style.circle}></div>
    </header>
  );
}
