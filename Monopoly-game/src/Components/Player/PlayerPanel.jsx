import React from "react";

export default function PlayerPanel({ players }) {
  return (
    <div className="player-panel">
      {players.map((player, index) => (
        <div key={index} className="player-card">
          <h3>{player.name}</h3>
          <p>💰 Money: ${player.money}</p>
          <p>📍 Position: {player.position}</p>
          <p>🏠 Properties: {player.properties.join(", ") || "None"}</p>
          <p>🚫 Bankrupt: {player.isBankrupt ? "Yes" : "No"}</p>
          <p>⛓️ Turns in Jail: {player.turnsInJail}</p>
        </div>
      ))}
    </div>
  );
}
