import React, { useState } from "react";
import "./Signup.css"
import { useNavigate } from "react-router-dom";

function Signup() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes("@") || !email.includes(".")) {
            setError("Enter valid Email");
            return;
        }

        if (password !== confirmPassword) {
            setError("Password not match");
            return;
        }

        try {
            const res = await fetch("https://react-django-quiz-app.onrender.com/api/user-signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            console.log("STATUS CODE:", res.status);

            let data = {};

            try {
                data = await res.json();
            } catch (err) {
                console.log("No JSON returned from server");
            }

            console.log("RESPONSE DATA:", data);

            if (res.ok) {
                console.log("Navigating to login...");
                navigate("/login");
            } else {
                setError(data.message || "Signup Failed");
            }

        } catch (error) {
            console.error("Network error:", error);
            setError("Server not responding");
        }};



        return (
            <div className="signup-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h2>Signup Page</h2>

                    {error ? <p style={{ color: "red" }}>{error}</p> : null}
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Signup</button>
                </form>

            </div>
        );
    }

    export default Signup;