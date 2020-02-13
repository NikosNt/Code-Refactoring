import React from "react";
import App from "./components/App";
import {render} from "react-dom";
import './styles/index.css'
import "bootstrap/dist/css/bootstrap.min.css";
 
const rootElement = document.getElementById("react-app");

render(<App/>, rootElement);
