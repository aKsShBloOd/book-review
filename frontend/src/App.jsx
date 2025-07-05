import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import ReadBook from "./pages/ReadBook";
import CreateBook from "./pages/CreateBook";
import { Toaster } from "react-hot-toast";

import React from "react";
// Importing necessary components from react-router-dom
import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore";
import EditBook from "./pages/EditBook";

function App() {
  const { theme } = useThemeStore();
  return (
    <div
      className="min-h-screen bg-base-200 transition-colors duration-300"
      data-theme={theme}
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<ReadBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/create" element={<CreateBook />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
