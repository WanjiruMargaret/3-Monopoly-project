// src/Game/GameLogic/gameReducer.js

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "MOVE_PLAYER": {
      const { playerId, toIndex } = action.payload;
      const updatedPlayers = state.players.map((player) => {
        if (player.id !== playerId || player.isBankrupt) return player;

        let newPosition = toIndex;
        let updated = { ...player, position: newPosition };

        // Handle passing GO
        if (newPosition < player.position) {
          updated.money += 200;
        }

        // Jail logic
        const tile = state.tiles[newPosition];
        if (tile.type === "jail") {
          updated.turnsInJail = 2;
        }

        return updated;
      });

      return { ...state, players: updatedPlayers };
    }

    case "BUY_PROPERTY": {
      const { playerId, tileIndex } = action.payload;
      const updatedPlayers = state.players.map((player) => {
        if (player.id !== playerId) return player;

        const tile = state.tiles[tileIndex];
        if (tile.type === "property" && player.money >= tile.price) {
          return {
            ...player,
            money: player.money - tile.price,
            properties: [...player.properties, tileIndex],
          };
        }
        return player;
      });

      return { ...state, players: updatedPlayers };
    }

    case "PAY_RENT": {
      const { payerId, ownerId, amount } = action.payload;
      const updatedPlayers = state.players.map((player) => {
        if (player.id === payerId) {
          const newMoney = player.money - amount;
          return {
            ...player,
            money: newMoney,
            isBankrupt: newMoney < 0,
          };
        }
        if (player.id === ownerId) {
          return { ...player, money: player.money + amount };
        }
        return player;
      });

      return { ...state, players: updatedPlayers };
    }

    case "NEXT_TURN":
      return {
        ...state,
        currentPlayer: (state.currentPlayer + 1) % state.players.length,
      };

    default:
      return state;
  }
};
