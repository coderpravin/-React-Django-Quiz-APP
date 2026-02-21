import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css"

function Navbar(){
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loginStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loginStatus === "true");
    }, []);

    const handleLogout  = async () => {
        try {
            await fetch("https://react-django-quiz-app.onrender.com/api/user-logout/", {
                method: "POST",
            });

            localStorage.removeItem("isLoggedIn");  // ⭐ remove login state
            navigate("/login");
            window.location.reload(); // refresh navbar state
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-left">Online Quiz</div>
            <div className="nav-right">
                {isLoggedIn ? (
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <button className="login-btn" onClick={() => navigate("/login")}>
                        Login
                    </button>
                )}
                
            </div>
        </nav>
  );
}

export default Navbar;