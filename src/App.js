import React from "react";
import Login from "./Component/login";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Post from "./Component/Main/Post";
import Request from "./Component/Main/Request";

function App() {
  return (
    <>
            
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/Request" element={<Request />} />
      </Routes>

      {/* <Nav />
      <div className="main-content">
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Post" element={<Post />} />
      </Routes>
      </div>
      <Footer/> */}
    </>
  );
}

export default App;
