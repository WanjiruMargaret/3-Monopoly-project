import { chanceCards, communityCards } from "./cards";

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "MOVE_PLAYER": {
      const landedTile = state.tiles[newPosition];

if (landedTile.type === "chance") {
  const randomCard = chanceCards[Math.floor(Math.random() * chanceCards.length)];
  dispatch({ type: "DRAW_CARD", payload: { playerId: currentPlayer.id, card: randomCard } });
}

if (landedTile.type === "community") {
  const randomCard = communityCards[Math.floor(Math.random() * communityCards.length)];
  dispatch({ type: "DRAW_CARD", payload: { playerId: currentPlayer.id, card: randomCard } });
}


      const { playerId, toIndex } = action.payload;

      let drawnCard = null;

      const updatedPlayers = state.players.map((player) => {
        if (player.id !== playerId || player.isBankrupt) return player;

        let newPosition = toIndex;
        let updated = { ...player, position: newPosition };

        // Handle passing GO
        if (newPosition < player.position) {
          updated.money += 200;
        }

        const tile = state.tiles[newPosition];

        // ✅ Handle Chance or Community Chest
        if (tile.type === "chance" || tile.type === "community") {
          const cardPool = tile.type === "chance" ? chanceCards : communityCards;
          drawnCard = cardPool[Math.floor(Math.random() * cardPool.length)];
          updated = drawnCard.effect(updated);
        }

        // ✅ Handle Jail
        if (tile.type === "jail") {
          updated.turnsInJail = 2;
        }

        return updated;
      });

      return {
        ...state,
        players: updatedPlayers,
        lastCardDrawn: drawnCard // ✅ Save the drawn card here
      };
    }

    case "DRAW_CARD": {
  const { playerId, card } = action.payload;
  const updatedPlayers = state.players.map((p) => {
    if (p.id !== playerId) return p;
    const newPlayer = card.effect(p); // Apply card effect
    return { ...newPlayer, id: p.id }; // Ensure player ID is preserved
  });

  return {
    ...state,
    players: updatedPlayers,
    lastCardDrawn: card, // 👈 SET the last card for the alert
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

    default:
      return state;
  }
};
