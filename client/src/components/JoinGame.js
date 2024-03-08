import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";

function JoinGame({ logOut }) {
    const [rivalUserName, setRivalUserName] = useState("");
    const { client } = useChatContext();
    const [channel, setChannel] = useState(null);

    const createChannel = async () => {
        const response = await client.queryUsers({ name: { $eq: rivalUserName} });

        if (response.users.length === 0) {
            alert("User not found");
            return;
        }

        const newChannel = await client.channel("messaging", {
            members: [client.userID, response.users[0].id]
        });

        await newChannel.watch();
        setChannel(newChannel);
    }

    return (
        <>
            {channel ? (
                <Channel channel={ channel } Input={ CustomInput }>
                    <Game channel={ channel } setChannel={ setChannel } />
                </Channel>
                ) : (
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Create Game</h4>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Rival Username</label>
                            <input 
                                type="text"
                                className="form-control"
                                onChange={(event) => {
                                    setRivalUserName(event.target.value);
                                }} 
                            />
                        </div>
                        <button type="button" className="btn btn-primary w-100" onClick={createChannel}>Join/Start Game</button>
                    </div>
                    <div className="card-footer">
                        <button type="button" className="btn btn-secondary float-end" onClick={logOut}>Log Out</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default JoinGame;
