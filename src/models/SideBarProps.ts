import { Dispatch, SetStateAction } from "react";

export type SideBarProps = {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};
