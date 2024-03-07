import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({ setIsAuth }) {
    const cookies = new Cookies();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        Axios.post("http://localhost:3001/login", { username, password }).then((res) => {
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
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Login</h4>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input 
                        type="text"
                        className="form-control"
                        onChange={(event) => {
                            setUserName(event.target.value);
                        }}
                        />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                        type="text"
                        className="form-control"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        />
                </div>

                <button type="button" className="btn btn-primary w-100" onClick={login}>Login</button>
            </div>
        </div>
    );
};

export default Login;
