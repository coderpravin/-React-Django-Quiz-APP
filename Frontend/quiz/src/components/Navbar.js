import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"

function Navbar(){
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <div className="nav-left">Online Quiz</div>
            <div className="nav-right">
                <button className="login-btn" onClick={()=> navigate("/login")}>Login</button>
            </div>
        </nav>
  );
}

export default Navbar;