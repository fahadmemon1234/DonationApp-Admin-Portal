import React from "react";
import Login from "./Component/login";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Nav from "./Component/Nav";
import Footer from "./Component/Footer";
import Post from "./Component/Main/Post";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>

      <Nav />
      <div className="main-content">
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Post" element={<Post />} />
      </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
