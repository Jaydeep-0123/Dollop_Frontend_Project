import React, { useEffect } from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import {Link, useNavigate} from 'react-router-dom'
import "../assets/styles/MainLayout.css";
function MainLayout({ children }) {

  const navigate=useNavigate();
  const auth=JSON.parse(localStorage.getItem("user"))
  useEffect(()=>{
     if(!auth)
     {
        navigate("/")
     }
  },[])
  return (
    <div>
      <div className="d-flex">
        <div className="main_Layout" style={{ width: "calc(100% - 80%)"}}>
          <SideBar />
        </div>
        <div
          className="overflow-y-scroll" 
          style={{ width: "calc(100% - 20%)" ,height:"100vh"}}
          id="children_container"
        > 
      <Navbar />
      <div >
          {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
