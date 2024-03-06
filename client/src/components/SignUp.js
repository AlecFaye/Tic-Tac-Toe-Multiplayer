import React, { userState } from "react";

function SignUp() {
    const [user, setUser] = userState(null);

    const signup = () => {

    };

    return (
        <div>
            <label>Sign Up</label>

            <input 
                placeholder="First Name" 
                onChange={(event) => {
                    setUser({ ...user, firstName: event.target.value });
                }}
            />
            <input 
                placeholder="Last Name" 
                onChange={(event) => {
                    setUser({ ...user, lastName: event.target.value });
                }}
            />
            <input 
                placeholder="Username" 
                onChange={(event) => {
                    setUser({ ...user, username: event.target.value });
                }}
            />
            <input 
                placeholder="Password" 
                onChange={(event) => {
                    setUser({ ...user, password: event.target.value });
                }}
            />
        </div>
    );
};

export default SignUp;
