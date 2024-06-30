import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home.tsx";
import Header from "./components/Header.tsx";
import OilInfo from "./components/OilInfo.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/oilInfo"} element={<OilInfo />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
