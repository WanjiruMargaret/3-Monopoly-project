import StartScreen from './components/StartScreen'
import GamePage from './pages/GamePage'
import { GameProvider, useGame } from './context/GameContext'
import './App.css'
import './styles/board.css'

function AppContent() {
  const { state, dispatch } = useGame()

  const startGame = () => {
    dispatch({ type: 'START_GAME' })
    dispatch({ type: 'ADD_LOG', payload: 'Game started! Player 1 goes first.' })
  }

  if (!state.gameStarted) {
    return <StartScreen onStartGame={startGame} />
  }

  return <GamePage />
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  )
}

export default App