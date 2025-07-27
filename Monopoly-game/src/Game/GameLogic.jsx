// Game/GameLogic.js
export const tiles = [
  { name: "GO", type: "start" },
  { name: "Mediterranean Avenue", type: "property", price: 60, rent: 2 },
  { name: "Community Chest", type: "community" },
  { name: "Baltic Avenue", type: "property", price: 60, rent: 4 },
  { name: "Income Tax", type: "tax", amount: 200 },
  { name: "Reading Railroad", type: "property", price: 200, rent: 25 },
  { name: "Chance", type: "chance" },
  { name: "Jail", type: "jail" },
  { name: "Vermont Avenue", type: "property", price: 100, rent: 6 },
  // Add more tiles as needed
];

export function gameReducer(state, action) {
  switch (action.type) {
    case "MOVE_PLAYER": {
      const { playerId, toIndex } = action.payload;
      const players = [...state.players];
      const player = players.find(p => p.id === playerId);
      const tile = state.tiles[toIndex];

      player.position = toIndex;

      // Handle tile logic
      if (tile.type === "property" && tile.owner && tile.owner !== playerId) {
        const owner = players.find(p => p.id === tile.owner);
        const rent = tile.rent;

        player.balance -= rent;
        owner.balance += rent;

        // Check if player goes bankrupt
        if (player.balance < 0) {
          player.isBankrupt = true;
          player.properties = [];
        }
      }

      if (tile.type === "tax") {
        player.balance -= tile.amount;
        if (player.balance < 0) player.isBankrupt = true;
      }

      if (tile.type === "jail") {
        player.turnsInJail = 2;
      }

      // Placeholder for Chance & Community Chest
      if (tile.type === "chance" || tile.type === "community") {
        console.log(`${tile.type} card drawn. Placeholder effect.`);
      }

      return { ...state, players: players, tiles: [...state.tiles] };
    }

    case "BUY_PROPERTY": {
      const { playerId, tileIndex } = action.payload;
      const players = [...state.players];
      const player = players.find(p => p.id === playerId);
      const tile = state.tiles[tileIndex];

      if (tile.type === "property" && !tile.owner && player.balance >= tile.price) {
        player.balance -= tile.price;
        player.properties.push(tileIndex);
        tile.owner = playerId;
      }

      return {
        ...state,
        players,
        tiles: [...state.tiles],
      };
    }

    case "NEXT_TURN": {
      const nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
      return { ...state, currentPlayerIndex: nextIndex };
    }

    case "SKIP_TURN_FOR_JAIL": {
      const players = [...state.players];
      const player = players.find(p => p.id === action.payload);
      if (player.turnsInJail > 0) {
        player.turnsInJail -= 1;
      }
      return { ...state, players };
    }

    case "LOAD_SAVED_STATE":
      return action.payload;

    default:
      return state;
  }
}

export function handleTileAction(player, tile, state) {
  // Example logic for handling tile actions
  if (tile.type === "property" && tile.owner && tile.owner !== player.id) {
    const owner = state.players.find(p => p.id === tile.owner);
    player.balance -= tile.rent;
    owner.balance += tile.rent;
    if (player.balance < 0) player.isBankrupt = true;
  }
  // Add more logic as needed
}
