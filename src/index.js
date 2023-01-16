import React from "react";
import ReactDOM from "react-dom/client";
import "./calendarLogics/index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ChakraProvider>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </ChakraProvider>
  // </React.StrictMode>
);
