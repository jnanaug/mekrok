import React from "react";
import Routes from "./Routes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

function App() {
  return (
    <>
      <Routes />
  <Analytics />
  <SpeedInsights />
    </>
  );
}

export default App;
