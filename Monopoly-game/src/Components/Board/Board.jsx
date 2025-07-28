// src/Components/Board/Board.jsx
import React from "react";
import tiles from "../../constants/tiles"; // default import matches your tiles export
import "../../style/board.css";

// Property Component
function Property({ property, index, players, isActive, onBuyProperty }) {
  const playersOnSpace = players.filter(p => p.position === index);
  const owner = players.find(p => p.properties.includes(index));
  const isOwned = !!owner;

  const handleClick = () => {
    if (property.price > 0 && !isOwned && isActive) {
      onBuyProperty(index);
    }
  };

  const colorClass = property.color
    ? `tile-property tile-${property.color}`
    : "tile-property";

  return (
    <div className={colorClass} onClick={handleClick}>
      {property.color && <div className="color-bar"></div>}
      <div className="property-name">{property.name}</div>
      {property.price > 0 && <div className="property-price">${property.price}</div>}
      {property.rent > 0 && <div className="property-rent">Rent ${property.rent}</div>}
      {isOwned && <div className="property-owner">🏠</div>}

      {/* Show player tokens */}
      <div className="property-players">
        {playersOnSpace.map(player => (
          <div
            key={player.id}
            className="property-player"
            title={player.name}
            style={{
              backgroundColor: player.color || "gray",
              border: "1px solid black",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Main Board
export default function Board({
  players = [],
  currentPlayer = 0,
  dice = [0, 0],
  isRolling = false,
  onRollDice = () => {},
  onBuyProperty = () => {},
}) {
  // Defensive: ensure currentPlayer is valid and players exist
  const activePlayer = players[currentPlayer] || { position: -1 };

  return (
    <div className="board">
      {/* Top row */}
      <div className="board-row-top">
        {tiles.slice(20, 31).reverse().map((property, i) => {
          const index = 30 - i;
          return (
            <Property
              key={index}
              property={property}
              index={index}
              players={players}
              isActive={activePlayer.position === index}
              onBuyProperty={onBuyProperty}
            />
          );
        })}
      </div>

      {/* Left column */}
      <div className="board-col-left">
        {tiles.slice(11, 20).map((property, i) => {
          const index = i + 11;
          return (
            <Property
              key={index}
              property={property}
              index={index}
              players={players}
              isActive={activePlayer.position === index}
              onBuyProperty={onBuyProperty}
            />
          );
        })}
      </div>

      {/* Center area */}
      <div className="board-center">
        <div className="board-title">MONOPOLY</div>
        <div className="board-dice">
          <div className="dice">{dice[0]}</div>
          <div className="dice">{dice[1]}</div>
        </div>
        <button
          onClick={onRollDice}
          disabled={isRolling}
          className="board-roll-btn"
        >
          {isRolling ? "Rolling..." : "Roll Dice"}
        </button>
        <div className="board-player-info">
          <p>{activePlayer.name ? `${activePlayer.name}'s Turn` : "Waiting..."}</p>
          <p>Moves: {dice[0] + dice[1]} steps</p>
        </div>
      </div>

      {/* Right column */}
      <div className="board-col-right">
        {tiles.slice(31, 40).reverse().map((property, i) => {
          const index = 39 - i;
          return (
            <Property
              key={index}
              property={property}
              index={index}
              players={players}
              isActive={activePlayer.position === index}
              onBuyProperty={onBuyProperty}
            />
          );
        })}
      </div>

      {/* Bottom row */}
      <div className="board-row-bottom">
        {tiles.slice(0, 11).map((property, index) => (
          <Property
            key={index}
            property={property}
            index={index}
            players={players}
            isActive={activePlayer.position === index}
            onBuyProperty={onBuyProperty}
          />
        ))}
      </div>
    </div>
  );
}

