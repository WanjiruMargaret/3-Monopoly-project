import React from "react";

export default function Board({ players }) {
  return (
    <div className="board">
      {players.map((player, index) => (
        <div key={index} className = "player-token" style={{ left: player.position * 10 + 'px' }}>
          <h4>{player.name}</h4>
          <p>Position: {player.position}</p>
        </div>
      ))}
    </div>
  );
}
