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
                const res = await fetch("https://react-django-quiz-app.onrender.com/api/user-login/",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                console.log("STATUS:", res.status);
                
                if (!res.ok){
                    throw new Error("Server Error "+ res.status)
                }


                const data  = await res.json();
                console.log("Parsed Data:", data);

                if (data.success){
                    console.log("Login Sucess");
                    localStorage.setItem("isLoggedIn", "true");
                    window.dispatchEvent(new Event("loginStatusChanged"));
                    navigate("/login-success/");
                    // window.location.reload();   // ⭐ add this line

                } else{
                    console.log("Login Failed");
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