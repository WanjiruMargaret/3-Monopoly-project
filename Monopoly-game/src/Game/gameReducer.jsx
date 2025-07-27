import { chanceCards, communityCards } from "./cards";

// ✅ Helper: handles effects of landing on special tiles
function handleTileAction(player, tile) {
  let updatedPlayer = { ...player };
  let drawnCard = null;

  if (tile.type === "chance" || tile.type === "community") {
    const cardPool = tile.type === "chance" ? chanceCards : communityCards;
    drawnCard = cardPool[Math.floor(Math.random() * cardPool.length)];
    updatedPlayer = drawnCard.effect(updatedPlayer);
  }

  if (tile.type === "jail") {
    updatedPlayer.turnsInJail = 2;
  }

  return { updatedPlayer, drawnCard };
}

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "MOVE_PLAYER": {
      const { playerId, toIndex } = action.payload;
      let drawnCard = null;

      const updatedPlayers = state.players.map((player) => {
        if (player.id !== playerId || player.isBankrupt) return player;

        let newPosition = toIndex;
        let updated = { ...player, position: newPosition };

        // ✅ Handle passing GO
        if (newPosition < player.position) {
          updated.money += 200;
        }

        const tile = state.tiles[newPosition];

        // ✅ Apply tile action
        const { updatedPlayer, drawnCard: card } = handleTileAction(updated, tile);
        drawnCard = card;

        return updatedPlayer;
      });

      return {
        ...state,
        players: updatedPlayers,
        lastCardDrawn: drawnCard, // ✅ used for alert
      };
    }

    case "DRAW_CARD": {
      const { playerId, card } = action.payload;
      const updatedPlayers = state.players.map((p) => {
        if (p.id !== playerId) return p;
        const updated = card.effect(p);
        return { ...updated, id: p.id }; // Preserve ID
      });

      return {
        ...state,
        players: updatedPlayers,
        lastCardDrawn: card,
      };
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
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
      };

    case "LOAD_SAVED_STATE":
      return action.payload;

    default:
      return state;
  }
};
