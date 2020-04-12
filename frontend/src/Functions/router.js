  import React from "react";
import HomePage from '../Views/HomePage/HomePage'
import SchedulePage from '../Views/SchedulePage/SchedulePage'
import Cadastro from '../Views/Register'
import Login from '../Views/Login'

const router = {
  "/": () => <HomePage />,
  "/agendar": () => <SchedulePage />,
  "/register" : () => <Cadastro />,
  "/login": () => <Login />,
  //"/about": () => <About />,
};
export default router;