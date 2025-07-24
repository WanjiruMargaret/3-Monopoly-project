import React, { useState } from "react";
import DiceForm from "./Components/dice/DiceForm"; // Optional: remove if unused
import Board from "./Components/Board/Board";
import PlayerPanel from "./Components/Player/PlayerPanel";
import { handlePlayerMove } from "./utils/MovePlayer";
import { initialPlayers } from "./utils/gameUtils";
import tiles from "./constants/tiles"; // NEW: your tiles file

export default function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);

  const handleRollDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    const die1 = Math.ceil(Math.random() * 6);
    const die2 = Math.ceil(Math.random() * 6);
    const total = die1 + die2;

    setDice([die1, die2]);

    setTimeout(() => {
      movePlayer(total);
      setIsRolling(false);
    }, 800); // simulate rolling delay
  };

  const movePlayer = (steps) => {
    setPlayers((prevPlayers) => {
      const updated = [...prevPlayers];
      const player = updated[currentPlayerIndex];

      if (player.isBankrupt) return updated;

      if (player.turnsInJail > 0) {
        player.turnsInJail -= 1;
        updated[currentPlayerIndex] = player;
        return updated;
      }

      const updatedPlayer = handlePlayerMove(
        player,
        steps,
        tiles, // using tiles instead of propertiesData
        null, // no setProperties needed
        updated
      );
      updated[currentPlayerIndex] = updatedPlayer;

      return updated;
    });

    setCurrentPlayerIndex((i) => (i + 1) % players.length);
  };

  const handleBuyProperty = (tileIndex) => {
    setPlayers((prevPlayers) => {
      const updated = [...prevPlayers];
      const player = updated[currentPlayerIndex];
      const tile = tiles[tileIndex];

      if (tile.type === "property" && player.balance >= tile.price) {
        player.balance -= tile.price;
        player.properties.push(tileIndex);
        updated[currentPlayerIndex] = player;
      }

      return updated;
    });
  };

  return (
    <div className="app">
      <h1>Monopoly Game MVP</h1>
      <Board
        players={players}
        currentPlayer={currentPlayerIndex}
        dice={dice}
        isRolling={isRolling}
        onRollDice={handleRollDice}
        onBuyProperty={handleBuyProperty}
        tiles={tiles}
      />
      <PlayerPanel players={players} />
    </div>
  );
}
