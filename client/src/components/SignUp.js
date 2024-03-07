import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({ setIsAuth }) {
    const cookies = new Cookies();
    const [user, setUser] = useState(null);

    const signup = () => {
        Axios.post("http://localhost:3001/signup", user).then((res) => {
            const { token, userId, firstName, lastName, username, hashedPassword } = res.data;

            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("username", username);
            cookies.set("hashedPassword", hashedPassword);

            setIsAuth(true);
        });
    };

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">Sign Up</h4>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        onChange={(event) => {
                            setUser({ ...user, firstName: event.target.value });
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        onChange={(event) => {
                            setUser({ ...user, lastName: event.target.value });
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input 
                        type="text"
                        className="form-control"
                        onChange={(event) => {
                            setUser({ ...user, username: event.target.value });
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                        type="text"
                        className="form-control"
                        onChange={(event) => {
                            setUser({ ...user, password: event.target.value });
                        }}
                    />
                </div>

                <button type="button" className="btn btn-primary w-100" onClick={signup}>Sign Up</button>
            </div>
        </div>
    );
};

export default SignUp;
