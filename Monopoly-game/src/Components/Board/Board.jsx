import React from "react";
import Tile from "./Tile";
import { tiles } from "../../Game/GameLogic";

export default function Board({ state, dispatch }) {
  const { players } = state;
  const currentPlayer = players[state.currentPlayerIndex];

  return (
    <div
      className="board"
      style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
    >
      {tiles.map((tile) => (
        <div
          key={tile.id}
          style={{ border: "1px solid black", padding: "10px", width: "150px" }}
        >
          <Tile tile={tile} player={currentPlayer} dispatch={dispatch} />
          {players.map(
            (p) =>
              p.position === tile.id && (
                <div key={p.id} style={{ fontWeight: "bold" }}>
                  🎩 {p.name}
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
}

