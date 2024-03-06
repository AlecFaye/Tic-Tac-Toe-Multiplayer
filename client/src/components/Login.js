import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({ setIsAuth }) {
    const cookies = new Cookies();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        Axios.post("http://localhost:3001/login", { username, password }).then((res) => {
            console.log("Message: " + res.data.message);

            console.log(res.data.token);
            console.log(res.data.userId);
            console.log(res.data.firstName);
            console.log(res.data.lastName);
            console.log(res.data.username);

            const { firstName, lastName, username, token, userId } = res.data;

            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("username", username);

            setIsAuth(true);
        });
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

            <button onClick={login}>Login</button>
        </div>
    );
};

export default Login;
