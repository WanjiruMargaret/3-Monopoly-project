export default function Dice({ dice, isRolling, onRollDice, currentPlayerName }) {
  return (
    <div className="dice-container">
      <div className="dice-display">
        <div className={`die ${isRolling ? 'spinning' : ''}`}>
          {isRolling ? '?' : dice[0]}
        </div>
        <div className={`die ${isRolling ? 'spinning' : ''}`}>
          {isRolling ? '?' : dice[1]}
        </div>
      </div>

      <button 
        onClick={onRollDice}
        disabled={isRolling}
        className="roll-button"
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>

      <div className="player-turn">
        {currentPlayerName}'s Turn
      </div>

      <div className="dice-total">
        Total: {dice[0] + dice[1]}
      </div>
    </div>
  )}
