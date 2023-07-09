/**
 * The App function returns a React component that sets up the routing for different pages in a web
 * application.
 * @returns The App component is being returned.
 */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, CourseDetail } from "./pages";
import {Gallery} from './components'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-detail" element={<CourseDetail />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
