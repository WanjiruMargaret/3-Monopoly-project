import React, { useState } from "react";
import DiceForm from "./Components/DiceForm";
import Board from "./Components/Board";
import PlayerPanel from "./Components/PlayerPanel";
import { handlePlayerMove } from "./utilis/MovePlayer";
import propertiesData from "./data/Properties";
import { rollDice, initialPlayers } from "./utilis/gameUtils";

export default function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState([1, 1]);
  const [properties, setProperties] = useState(propertiesData);

  const handleRollDice = () => {
    const die1 = Math.ceil(Math.random() * 6);
    const die2 = Math.ceil(Math.random() * 6);
    const total = die1 + die2;

    setDice([die1, die2]);
    movePlayer(total);
  };

  const movePlayer = (steps) => {
    setPlayers((prevPlayers) => {
      const updated = [...prevPlayers];
      const player = updated[currentPlayerIndex];

      // Skip if bankrupt
      if (player.isBankrupt) return updated;

      // Skip turn in jail
      if (player.turnsInJail > 0) {
        player.turnsInJail -= 1;
        updated[currentPlayerIndex] = player;
        return updated;
      }

      const updatedPlayer = handlePlayerMove(player, steps, properties, setProperties, updated);
      updated[currentPlayerIndex] = updatedPlayer;

      return updated;
    });

    setCurrentPlayerIndex((i) => (i + 1) % players.length);
  };

  return (
    <div className="app">
      <h1>Monopoly Game MVP</h1>
      <Dice dice={dice} onRoll={handleRollDice} />
      <Board players={players} />
      <PlayerPanel players={players} />
    </div>
  );
}
