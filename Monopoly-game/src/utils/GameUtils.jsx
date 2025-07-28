// Re-exporting from submodules
export { rollDice } from "./rollDice";
export { handlePlayerMove } from "./handlePlayerMove";
export { buyProperty } from "./buyProperty";

// Players array
export const initialPlayers = [
  {
    id: 1,
    name: "Player 1",
    color: "red",
    emoji: "🧝‍♀️",
    position: 0,
    balance: 1500,
    properties: [],
    turnsInJail: 0,
    bankrupt: false,
  },
  {
    id: 2,
    name: "Player 2",
    color: "blue",
    position: 0,
    emoji: "🧙",
    balance: 1500,
    properties: [],
    turnsInJail: 0,
    bankrupt: false,
  },
];
