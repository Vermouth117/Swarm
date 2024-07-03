import style from "../styles/Header.module.scss";
import CircleMenuIcon from "../icons/CircleMenu.svg";

export default function Header() {
  return (
    <header className={style.container}>
      <CircleMenuIcon />
      <h1>TOYOTA</h1>
      <div
        className={style.circle}
        style={{
          background: `url("/images/accountImage.png") no-repeat center bottom`,
        }}
      ></div>
    </header>
  );
}
