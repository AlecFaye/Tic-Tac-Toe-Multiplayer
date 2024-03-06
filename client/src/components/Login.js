import React, { useState } from "react";


function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        
    };

    return (
        <div>
            <label>Login</label>

            <input 
                placeholder="Username" 
                onChange={(event) => {
                    setUserName(event.target.value);
                }}
                />
            <input 
                placeholder="Password" 
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />

            <button onClick={login}>Sign Up</button>
        </div>
    );
};

export default Login;
