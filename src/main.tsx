import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { MapContextProvider } from "./components/Context/MapContextProvider.tsx";
import { CarInfoContextProvider } from "./components/Context/CarInfoContextProvider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CarInfoContextProvider>
      <MapContextProvider>
        <App />
      </MapContextProvider>
    </CarInfoContextProvider>
  </React.StrictMode>,
);
