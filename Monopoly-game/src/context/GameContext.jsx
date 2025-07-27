// src/context/GameContext.jsx
import { createContext, useContext, useReducer } from 'react'

// 🎮 Initial state
const initialState = {
  gameStarted: false,
  currentPlayerIndex: 0,
  players: [
    { name: 'Player 1', money: 1500, position: 0, color: 'red', inJail: false, isBankrupt: false },
    { name: 'Player 2', money: 1500, position: 0, color: 'blue', inJail: false, isBankrupt: false }
  ],
  properties: [],
  log: [],
  dice: [1, 1],
  showModal: false,
  selectedProperty: null
}

// 🧠 Reducer function
function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, gameStarted: true }

    case 'ROLL_DICE':
      return { ...state, dice: action.payload }

    case 'MOVE_PLAYER':
      return {
        ...state,
        players: state.players.map((player, index) =>
          index === state.currentPlayerIndex
            ? { ...player, position: action.payload }
            : player
        )
      }

    case 'BUY_PROPERTY':
      return {
        ...state,
        players: state.players.map((player, index) =>
          index === state.currentPlayerIndex
            ? { ...player, money: player.money - action.payload.price }
            : player
        ),
        properties: [...state.properties, { ...action.payload, owner: state.currentPlayerIndex }]
      }

    case 'NEXT_TURN':
      return {
        ...state,
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length
      }

    case 'SHOW_MODAL':
      return { ...state, showModal: true, selectedProperty: action.payload }

    case 'HIDE_MODAL':
      return { ...state, showModal: false, selectedProperty: null }

    case 'ADD_LOG':
      return { ...state, log: [action.payload, ...state.log] }

    case 'PAY_RENT':
      const { payerIndex, receiverIndex, rent } = action.payload
      return {
        ...state,
        players: state.players.map((player, index) => {
          if (index === payerIndex) return { ...player, money: player.money - rent }
          if (index === receiverIndex) return { ...player, money: player.money + rent }
          return player
        })
      }

    case 'DECLARE_BANKRUPTCY':
      return {
        ...state,
        players: state.players.map((player, index) =>
          index === action.payload ? { ...player, isBankrupt: true } : player
        )
      }

    default:
      return state
  }
}

// 🧩 Create Context
const GameContext = createContext()

// ✅ Game Provider
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

// 🔁 Custom Hook
export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
