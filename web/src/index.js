/* This is a JavaScript code that imports necessary modules and components from various files and
libraries, sets the app element for a modal, creates a root element using ReactDOM, and renders the
App component wrapped in AuthContextProvider and WorkoutsContextProvider components. It also
includes a function call to reportWebVitals for measuring performance in the app. */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { AuthContextProvider } from "./pages/form page/AuthContext";
import { WorkoutsContextProvider } from "./context/WorkoutContext";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
