import { useState, useEffect } from "react";
import "./index.css";
import socketIo from "socket.io-client";
import TicTacToe from './TicTacToe';

const createRoomUrl = "http://localhost:5000/create-room";
const socket = socketIo("http://localhost:5000");

const App = () => {
    const [roomId, setRoomId] = useState("");
    const [room, setRoom] = useState(null);
    const [username, setUsername] = useState("");

    const createRoom = async (event) => {
        event.preventDefault();
        if (!username) return;
        const response = await fetch(createRoomUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        });
        const data = await response.json();
        setRoom(data);
        socket.emit("join-room", { username, roomId: data.roomId });
        console.log(data);
    };

    const joinRoom = (event) => {
        event.preventDefault();
        socket.emit('join-room', {username, roomId});
    }

    useEffect(() => {
        socket.on('room-data', (_room) => {
            console.log(_room);
            setRoom(_room);
        })
    }, []);

    return (
        <div className="container">
            {room === null ? (
                <form>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <button onClick={createRoom}>Create Room</button>
                    <p>OR</p>
                    <input
                        type="text"
                        placeholder="Room ID"
                        value={roomId}
                        onChange={(event) => setRoomId(event.target.value)}
                    />
                    <button onClick={joinRoom}>Join Room</button>
                </form>
            ) : (
                <TicTacToe room={room} socket={socket}/>
            )}
        </div>
    );
};

export default App;
