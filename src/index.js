import React from "react";
import App from "./components/app";
import { render } from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("react-app");

render(<App />, rootElement);
