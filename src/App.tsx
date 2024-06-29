import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
