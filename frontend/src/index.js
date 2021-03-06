import React from 'react';
import ReactDOM from 'react-dom';
import {useRoutes} from 'hookrouter';
import './index.css';
import router from "../src/Functions/router";

function App() {
    const routeResult = useRoutes(router);
    return routeResult;
}
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA