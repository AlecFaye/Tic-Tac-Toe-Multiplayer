import React, { useState } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "../Chat.css";

function Game({ channel, setChannel }) {
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [result, setResult] = useState({ winner: "none" , state: "none" })

    const leaveGame = async () => {
        await channel.stopWatching();
        setChannel(null);
    }

    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
    });

    if (!playersJoined) {
        return (
            <div className="text-light">
                Waiting for other player to join...
            </div>
        );
    }

    return (
        <div className="gameContainer">
            <Board result={ result } setResult={ setResult } />
            <Window>
                <MessageList 
                    disableDateSeparator 
                    closeReactionSelectorOnClick 
                    hideDeletedMessages
                    messageActions={ ["react"] }
                />
                <MessageInput 
                    noFiles 
                />
            </Window>
            <button onClick={ leaveGame }>Leave Game</button>
            {result.state === "won" && <div>{result.winner} Won the Game</div>}
            {result.state === "tie" && <div>Game Tied</div>}
        </div>
    );
};

export default Game;
