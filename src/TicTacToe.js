import "./styles/tic-tac-toe.scss";
import { GrClose } from "react-icons/gr";
import { BiCircle } from "react-icons/bi";
import Loading from "./Loading";

const TicTacToe = ({ socket, room, username }) => {
    const playTurn = (i, j) => {
        if (room.players?.[room.playerTurn].username === username) {
            console.log(room.players?.[room.playerTurn].username);
            if (room.playerTurn === "player1")
                socket.emit("play-turn", {
                    position: [i, j],
                    roomId: room.roomId,
                    player: "player1",
                });
            else
                socket.emit("play-turn", {
                    position: [i, j],
                    roomId: room.roomId,
                    player: "player2",
                });
        }
    };

    const getIcon = (cell) => {
        if (cell === "X") return <GrClose />;
        else if (cell === "O") return <BiCircle />;
        return "";
    };

    const getGameResult = () => {
        if (room.winner) return `${room.players[room.winner].username} won`;
        else return "It's a draw";
    };

    const playAgain = () => {
        socket.emit("play-again", {roomId: room.roomId});
    };

    return (
        <div className="tic-tac-toe">
            <h1>TicTacToe</h1>
            <h2>
                Room ID <span>{room.roomId}</span>
            </h2>
            {room.players?.player1.username &&
            room.players?.player2.username ? (
                <>
                    <div className="player-username">
                        <div className="player player1">
                            <p>{`${room.players?.player1.username} ${
                                room.players?.player1.username === username
                                    ? " (You)"
                                    : ""
                            }`}</p>
                            <span>{room.players?.player1.winCount}</span>
                        </div>
                        <div className="player player2">
                            <p>{`${room.players?.player2.username} ${
                                room.players?.player2.username === username
                                    ? " (You)"
                                    : ""
                            }`}</p>
                            <span>{room.players?.player2.winCount}</span>
                        </div>
                    </div>
                    {room.gameOver && (
                        <>
                            <h2 className="game-result">{getGameResult()}</h2>
                            {
                                room.players?.player1.username === username
                                ?
                                <input
                                    type="button"
                                    value="Play Again"
                                    className="play-again"
                                    onClick={playAgain}
                                />
                                :
                                <p>Waiting for host...</p>
                            }
                        </>
                    )}
                    <div className="board">
                        {room.board?.map((row, i) => {
                            return (
                                <div className="board-row" key={i}>
                                    {row.map((cell, j) => {
                                        return (
                                            <div
                                                className="board-cell"
                                                key={j}
                                                value={cell}
                                                onClick={() => playTurn(i, j)}
                                            >
                                                {getIcon(cell)}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                    <p>{room.players?.[room.playerTurn].username}'s turn</p>
                    <p>Turns played {room.turns}</p>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default TicTacToe;
