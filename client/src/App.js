import './App.css';
import JoinGame from './components/JoinGame';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
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
        }, token).then(() => {
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
                <Chat client={ client }>
                    <JoinGame />
                    <button onClick={logOut}>Log Out</button>
                </Chat>
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
