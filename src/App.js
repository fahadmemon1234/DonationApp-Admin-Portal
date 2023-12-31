import React from "react";
import Login from "./Component/login";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Post from "./Component/Main/Post";
import Request from "./Component/Main/Request";
import VideoPost from "./Component/Main/VideoPost";
import Donation from "./Component/Main/Donation";
import New from './Component/Main/RequestNew';
import Reject from './Component/Main/RequestReject';

function App() {
  return (
    <>
            
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/Request" element={<Request />} />
        <Route path="/VideoPost" element={<VideoPost />} />
        <Route path="/Donation" element={<Donation />} />
        <Route path="/RequestNew" element={<New />} />
        <Route path="/RequestReject" element={<Reject />} />
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
