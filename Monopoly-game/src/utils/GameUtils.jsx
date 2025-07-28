export function rollDice() {
  const die1 = Math.floor(Math.random() * 6) + 1;
  const die2 = Math.floor(Math.random() * 6) + 1;
  return [die1, die2];
}
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

