import './styles/tic-tac-toe.css';
import {GrClose} from 'react-icons/gr';
import {BiCircle} from 'react-icons/bi';

const TicTacToe = ({ socket, room, username }) => {
    const playTurn = (i, j) => {
        if(room.players?.[room.playerTurn].username === username) {
            console.log(room.players?.[room.playerTurn].username);
            if(room.playerTurn === 'player1') 
                socket.emit('play-turn', {position: [i, j], roomId: room.roomId, player: 'player1'});
            else 
                socket.emit('play-turn', {position: [i, j], roomId: room.roomId, player: 'player2'});
        }
    }

    const getIcon = (cell) => {
        if(cell === 'X') 
            return <GrClose/>
        else if(cell === 'O') 
            return <BiCircle/>
        return "";
    }

    return (
        <div className="tic-tac-toe">
            <h1>Room ID <span>{room.roomId}</span></h1>
            <p>
                {room.players?.player1.username} versus{" "}
                {room.players?.player2.username}
            </p>
            <p>{room.gameOver && `Game over ${room.players[room.winner].username} won`}</p>
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
        </div>
    );
};

export default TicTacToe;
