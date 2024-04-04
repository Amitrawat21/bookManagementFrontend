import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";

import Register from "./Pages/Register";
import Login from "./Pages/Login";

import Home from "./Pages/Home";
import Books from "./Pages/Books";
import AddBooks from "./Pages/AddBooks";
import UpdateBook from "./Pages/UpdateBook";
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:name" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/addBooks" element={<AddBooks />} />
        <Route path="/update" element={<UpdateBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
