import { BrowserRouter, Route, Routes } from "react-router-dom";

import Map from "./components/Maps/Map.tsx";
import Home from "./components/Home.tsx";
import Voice from "./components/Voice.tsx";
import Header from "./components/Header.tsx";
import OilInfo from "./components/Information/OilInfo.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/map"} element={<Map />} />
          <Route path={"/voice"} element={<Voice />} />
          <Route path={"/oilInfo"} element={<OilInfo />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
