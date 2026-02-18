    //import React, {useState} from "react";
    import "./Login.css"

    function Login(){
        //const [email, setEmail] = useState("");
        //const [password, setPassword] = useState("");
        return(
            <div className="login-container">
                <form className="login-form">
                    <h2>Login Page</h2>
                    <input 
                    type="email"
                    placeholder="Enter your email"
                    //value ={email}
                    required
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        //value ={password}
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