    //import React, {useState} from "react";
    import { useNavigate } from "react-router-dom"
    import "./Login.css"
    import { useState } from "react"

    function Login(){

        const navigate = useNavigate();

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");

        const handleSubmit = async (e) =>{
            e.preventDefault();
            console.log("LOGIN CLICKED");  

            try{
                const res = await fetch("http://127.0.0.1:8000/api/user-login/",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await res.json();

                if (res.ok && data.success){
                    localStorage.setItem("isLoggedIn", "true");
                    navigate("/login-success/");
                    window.location.reload();   // ⭐ add this line

                }else {
                    setError(data.message || "Invalid Credentials");
                }
            } catch(error){
                console.error("The error is", error);
            }
        };

        //const [email, setEmail] = useState("");
        //const [password, setPassword] = useState("");
        return(
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login Page</h2>
                    {error && <p style={{ color : 'red'}}>{error}</p>}
                    <input 
                    type="email"
                    placeholder="Enter your email"
                    value ={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value ={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Login</button>

                      <p className="signup-text">
                            Don't have an account? <a href="/signup">Sign up</a>
                      </p>

                </form>

              
                

            </div>
        );
    }

    export default Login;