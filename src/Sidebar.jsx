import React from "react";
import { useNavigate } from "react-router-dom";


function Sidebar() {
  const navigate=useNavigate();
  return (
    <><div className="d-flex flex-column position-fixed top-0  gap-4 h-100 p-3 border borderr-1 ol">
      {/* Main Sidebar Menu */}
      <div className="d-flex flex-column gap-3 p-3 ">
        <img src="/images/text.png" alt="instagram" className="txts" />
        <div className="options" onClick={()=>{navigate('/')}}><i className="bi bi-house-door-fill"></i>Home</div>
        <div  className="options"><i className="bi bi-search"></i>Search</div>
        <div  className="options"><i className="bi bi-compass"></i>Explore</div>
        <div  className="options"><i className="bi bi-camera-reels"></i>Reels</div>
        <div  className="options"><i className="bi bi-chat-left-dots"></i>Messages</div>
        <div  className="options"><i className="bi bi-heart"></i>Notification</div>
        <div  className="options"><i className="bi bi-plus-square"></i>Create</div>
        <div  className="options" onClick={()=>{navigate('/profile/')}}><i className="bi bi-person-circle"></i>Profile</div>
      </div>

      {/* Bottom Menu */}
      <div className="d-flex flex-column gap-3 p-3 mb-3">
        <div  className="options"><i className="bi bi-threads"></i>Threads</div>
        <div  className="options"><i className="bi bi-list"></i>More</div>
      </div>
      </div>
    </>
  );
}

export default Sidebar;
