// src/GameLogic.jsx

export const TILE_TYPES = {
  GO: 'GO',
  PROPERTY: 'PROPERTY',
  CHANCE: 'CHANCE',
  CHEST: 'CHEST',
  JAIL: 'JAIL',
};

export const tiles = [
  { id: 0, name: 'GO', type: TILE_TYPES.GO },
  { id: 1, name: 'Mediterranean Ave', type: TILE_TYPES.PROPERTY, price: 60, rent: 2 },
  { id: 2, name: 'Community Chest', type: TILE_TYPES.CHEST },
  { id: 3, name: 'Baltic Ave', type: TILE_TYPES.PROPERTY, price: 60, rent: 4 },
  { id: 4, name: 'Jail', type: TILE_TYPES.JAIL },
  { id: 5, name: 'Chance', type: TILE_TYPES.CHANCE },
  { id: 6, name: 'Boardwalk', type: TILE_TYPES.PROPERTY, price: 400, rent: 50 },
];

const chanceCards = [
  {
    text: 'Advance to GO',
    action: (player, dispatch) => {
      dispatch({ type: 'MOVE_PLAYER', payload: { playerId: player.id, toIndex: 0 } });
      dispatch({ type: 'ADD_MONEY', payload: { playerId: player.id, amount: 200 } });
    },
  },
  {
    text: 'Pay school fees of $150',
    action: (player, dispatch) => {
      dispatch({ type: 'ADD_MONEY', payload: { playerId: player.id, amount: -150 } });
    },
  },
];

const chestCards = [
  {
    text: 'Bank error in your favor. Collect $200.',
    action: (player, dispatch) => {
      dispatch({ type: 'ADD_MONEY', payload: { playerId: player.id, amount: 200 } });
    },
  },
  {
    text: 'Doctor’s fees. Pay $50.',
    action: (player, dispatch) => {
      dispatch({ type: 'ADD_MONEY', payload: { playerId: player.id, amount: -50 } });
    },
  },
];

export function handleTileAction({ tile, player, dispatch }) {
  switch (tile.type) {
    case 'GO':
      dispatch({ type: 'ADD_MONEY', payload: { playerId: player.id, amount: 200 } });
      break;

    case 'PROPERTY':
      if (!tile.owner) {
        const wantsToBuy = window.confirm(`${player.name}, buy ${tile.name} for $${tile.price}?`);
        if (wantsToBuy && player.money >= tile.price) {
          dispatch({ type: 'BUY_PROPERTY', payload: { tileId: tile.id, playerId: player.id } });
        }
      } else if (tile.owner !== player.id) {
        dispatch({ type: 'PAY_RENT', payload: { fromId: player.id, toId: tile.owner, amount: tile.rent } });
      }
      break;

    case 'CHANCE':
      const chance = chanceCards[Math.floor(Math.random() * chanceCards.length)];
      alert(`Chance: ${chance.text}`);
      chance.action(player, dispatch);
      break;

    case 'CHEST':
      const chest = chestCards[Math.floor(Math.random() * chestCards.length)];
      alert(`Community Chest: ${chest.text}`);
      chest.action(player, dispatch);
      break;

    case 'JAIL':
      alert(`${player.name} is just visiting jail.`);
      break;

    default:
      break;
  }
}

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MONEY':
      return {
        ...state,
        players: state.players.map(p =>
          p.id === action.payload.playerId
            ? { ...p, money: p.money + action.payload.amount }
            : p
        ),
      };

    case 'BUY_PROPERTY':
      const tileToBuy = state.tiles.find(t => t.id === action.payload.tileId);
      return {
        ...state,
        players: state.players.map(p =>
          p.id === action.payload.playerId
            ? {
                ...p,
                money: p.money - tileToBuy.price,
                properties: [...p.properties, tileToBuy.id],
              }
            : p
        ),
        tiles: state.tiles.map(t =>
          t.id === tileToBuy.id ? { ...t, owner: action.payload.playerId } : t
        ),
      };

    case 'PAY_RENT':
      return {
        ...state,
        players: state.players.map(p => {
          if (p.id === action.payload.fromId) return { ...p, money: p.money - action.payload.amount };
          if (p.id === action.payload.toId) return { ...p, money: p.money + action.payload.amount };
          return p;
        }),
      };

    case 'MOVE_PLAYER':
      return {
        ...state,
        players: state.players.map(p =>
          p.id === action.payload.playerId ? { ...p, position: action.payload.toIndex } : p
        ),
      };

    case 'NEXT_TURN':
      return {
        ...state,
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
      };

    default:
      return state;
  }
};
