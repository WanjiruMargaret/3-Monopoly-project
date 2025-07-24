import { rollDice } from "./rollDice";
import { handlePlayerMove } from "./handlePlayerMove";
import { buyProperty } from "./buyProperty";

export const initialPlayers = [
  {
    id: 1,
    name: "Player 1",
    color: "red",
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
    balance: 1500,
    properties: [],
    turnsInJail: 0,
    bankrupt: false,
  },
];

