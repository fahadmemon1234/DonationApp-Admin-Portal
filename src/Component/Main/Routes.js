import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import Footer from "./Footer";
import Post from "./Post";


function Routes(){
    return(
        <>
          <Nav />
      <div className="main-content">
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Post" element={<Post />} />
      </Routes>
      </div>
      <Footer/>
        </>
    )
}

export default Routes;