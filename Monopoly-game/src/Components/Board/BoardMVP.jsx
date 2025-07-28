import React from "react";
import PropertyCard from "./PropertyCard";

export default function Board({
  players,
  currentPlayer,
  dice,
  isRolling,
  onRollDice,
  onBuyProperty,
  tiles,
}) {
  return (
    <div className="board">
      <button onClick={onRollDice} disabled={isRolling}>
        {isRolling ? "Rolling..." : "Roll Dice"}
      </button>
      <p>
        🎲 Dice Roll: {dice[0]} + {dice[1]} = {dice[0] + dice[1]}
      </p>
      <div className="tile-grid">
        {tiles.map((tile, index) => {
          const playersHere = players.filter((p) => p.position === index);
          const isOwned = players.some((p) => p.properties.includes(index));
          const owner = players.find((p) => p.properties.includes(index));

          return (
            <div key={index} className="tile" onClick={() => onBuyProperty(index)}>
              <strong>{tile.name}</strong>
              {tile.type === "property" && <p>${tile.price}</p>}
              {playersHere.map((p) => (
                <div
                  key={p.id}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: p.color,
                    display: "inline-block",
                    margin: "2px",
                  }}
                />
              ))}
              <PropertyCard
                property={tile}
                isOwned={isOwned}
                owner={owner}
                onBuy={() => onBuyProperty(index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
