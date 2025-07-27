import tiles from "../../constants/tiles";
import React from "react";
import Tile from "./Tile";
import "../../style/board.css";

export default function Board({ state, dispatch }) {
  const { players } = state;
  const currentPlayer = players[state.currentPlayerIndex];

  return (
    <div
      className={colorClass}
      onClick={handleClick}
    >
      {property.color && (
        <div className="color-bar"></div>
      )}
      <div className="property-name">{property.name}</div>
      {property.price > 0 && (
        <div className="property-price">${property.price}</div>
      )}
      {property.rent > 0 && (
        <div className="property-rent">Rent ${property.rent}</div>
      )}
      {isOwned && owner && (
        <div className="property-owner"></div>
      )}
      <div className="property-players">
        {playersOnSpace.map(player => (
          <div
            key={player.id}
            className="property-player"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default function Board({ players, currentPlayer, dice, isRolling, onRollDice, onBuyProperty }) {
  return (
    <div className="board"div/>
      {/* Top row */}
      <div className="board-row-top">
        {tiles.slice(20, 31).reverse().map((property, index) => (
          <Property
            key={30 - index}
            property={property}
            index={30 - index}
            players={players}
            isActive={players[currentPlayer].position === 30 - index}
            onBuyProperty={onBuyProperty}
          />
        ))}
      </div>

      {/* Left column */}
      <div className="board-col-left">
        {tiles.slice(11, 20).map((property, index) => (
          <Property
            key={index + 11}
            property={property}
            index={index + 11}
            players={players}
            isActive={players[currentPlayer].position === index + 11}
            onBuyProperty={onBuyProperty}
          />
        ))}
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
          <p>{players[currentPlayer].name}'s Turn</p>
          <p>Moves: {dice[0] + dice[1]} steps</p>
        </div>
      ))}
    </div>
  );
}


