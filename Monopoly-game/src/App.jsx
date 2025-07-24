import React, { useState } from "react";
import DiceForm from "./Components/dice/DiceForm"; // You can remove this if not used
import Board from "./Components/Board/Board";
import PlayerPanel from "./Components/Player/PlayerPanel";
import { handlePlayerMove } from "./utils/MovePlayer";
import propertiesData from "./Components/data/Properties";
import { initialPlayers } from "./utils/gameUtils";

export default function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState([1, 1]);
  const [properties, setProperties] = useState(propertiesData);
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

      const updatedPlayer = handlePlayerMove(player, steps, properties, setProperties, updated);
      updated[currentPlayerIndex] = updatedPlayer;

      return updated;
    });

    setCurrentPlayerIndex((i) => (i + 1) % players.length);
  };

  const handleBuyProperty = (propertyIndex) => {
    setPlayers((prevPlayers) => {
      const updated = [...prevPlayers];
      const player = updated[currentPlayerIndex];
      const property = properties[propertyIndex];

      if (player.balance >= property.price) {
        player.balance -= property.price;
        player.properties.push(propertyIndex);
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
      />
      <PlayerPanel players={players} />
    </div>
  );
}
