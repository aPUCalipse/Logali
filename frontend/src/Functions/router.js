import React from "react";
import HomePage from '../Views/HomePage/HomePage'
import SchedulePage from '../Views/SchedulePage/SchedulePage'

const router = {
  "/": () => <HomePage />,
  "/agendar": () => <SchedulePage />,
  //"/about": () => <About />,
};
export default router;