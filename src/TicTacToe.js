const TicTacToe = ({socket, room}) => {
	return (
		<div>
            <h1>
                Joined Room with ID : {room.roomId}
            </h1>
            <p>{room.players?.player1.username} versus {room.players?.player2.username}</p>
        </div>	
	);
}

export default TicTacToe;