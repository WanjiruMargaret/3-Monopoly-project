// src/Game/cards.js
export const chanceCards = [
  { type: "chance", text: "Advance to GO", effect: (player) => ({ ...player, position: 0, money: player.money + 200 }) },
  { type: "chance", text: "Bank pays you dividend of $50", effect: (player) => ({ ...player, money: player.money + 50 }) },
  { type: "chance", text: "Go to Jail", effect: (player) => ({ ...player, position: 10, turnsInJail: 2 }) },
  { type: "chance", text: "Pay poor tax of $15", effect: (player) => ({ ...player, money: player.money - 15 }) },
];

export const communityCards = [
  { type: "community", text: "Doctor's fees – Pay $50", effect: (player) => ({ ...player, money: player.money - 50 }) },
  { type: "community", text: "You inherit $100", effect: (player) => ({ ...player, money: player.money + 100 }) },
  { type: "community", text: "Go to Jail", effect: (player) => ({ ...player, position: 10, turnsInJail: 2 }) },
  { type: "community", text: "From sale of stock you get $45", effect: (player) => ({ ...player, money: player.money + 45 }) },
];
