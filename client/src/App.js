import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import { useState } from "react";

function App() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const client = StreamChat.getInstance(process.env.REACT_APP_API_KEY);
    const [isAuth, setIsAuth] = useState(false);

    if (token) {
        client.connectUser({ 
            id: cookies.get("userId"),
            name: cookies.get("username"),
            firstName: cookies.get("firstName"),
            lastName: cookies.get("lastName"),
            hashedPassword: cookies.get("hashedPassword")
        }, token).then((user) => {
            setIsAuth(true);
        });
    }

    const logOut = () => {
        cookies.remove("token");
        cookies.remove("userId");
        cookies.remove("firstName");
        cookies.remove("lastName");
        cookies.remove("username");
        cookies.remove("hashedPassword");

        client.disconnectUser();
        setIsAuth(false);
    }

    return (
        <div> 
            {isAuth ? (
                <button onClick={logOut}>Log Out</button>
                ) : (
                <>
                    <SignUp setIsAuth={setIsAuth}/>
                    <Login setIsAuth={setIsAuth} />
                </>
            )}
        </div>
    );
};

export default App;
