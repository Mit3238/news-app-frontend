import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"; // The component with your buttons
import NewsDetails from "./NewsDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:category" element={<NewsDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
