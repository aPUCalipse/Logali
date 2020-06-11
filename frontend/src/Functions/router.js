import React from "react";
import HomePage from '../Views/HomePage/HomePage'
import SchedulePage from '../Views/SchedulePage/SchedulePage'
import Cadastro from '../Views/RegisterPage/Register'
import Login from '../Views/Login/Login'
import Technical from '../Views/SchedulePageTec/SchedulePageTec'
// import Chat from '../Views/Chat/Chat'

const router = {
  "/": () => <HomePage />,
  "/agendar": () => <SchedulePage />,
  "/register": () => <Cadastro />,
  "/login": () => <Login />,
  "/agenda": () => <Technical />,
  // "/chat": () => <Chat />
  //"/about": () => <About />,
};
export default router;