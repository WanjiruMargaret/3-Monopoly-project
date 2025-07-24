export function rollDice() {
  const die1 = Math.ceil(Math.random() * 6);
  const die2 = Math.ceil(Math.random() * 6);
  return [die1, die2];
}

export const initialPlayers = [
  { name: "Player 1", position: 0, money: 1500, properties: [], isBankrupt: false, turnsInJail: 0 },
  { name: "Player 2", position: 0, money: 1500, properties: [], isBankrupt: false, turnsInJail: 0 },
];
