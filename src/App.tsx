import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home.tsx";
import Voice from "./components/Voice.tsx";
import Map from "./components/Maps/Map.tsx";
import Header from "./components/Header.tsx";
import CarInfo from "./components/Information/CarInfo.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/map"} element={<Map />} />
          <Route path={"/voice"} element={<Voice />} />
          <Route path={"/carInfo"} element={<CarInfo />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
