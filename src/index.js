import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./hooks";

import "bulma/css/bulma.css";
import "react-toastify/dist/ReactToastify.css";

import MainContainer from "./components/MainContainer";
import { ToastContainer } from "react-toastify";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <MainContainer>
        <App />
      </MainContainer>
      <ToastContainer />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
