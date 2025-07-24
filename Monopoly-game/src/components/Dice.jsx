export default function Dice({ dice, isRolling, onRollDice, currentPlayerName }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <div className={`w-12 h-12 bg-white border-2 border-black rounded flex items-center justify-center text-xl font-bold ${
          isRolling ? 'animate-spin' : ''
        }`}>
          {isRolling ? '?' : dice[0]}
        </div>
        <div className={`w-12 h-12 bg-white border-2 border-black rounded flex items-center justify-center text-xl font-bold ${
          isRolling ? 'animate-spin' : ''
        }`}>
          {isRolling ? '?' : dice[1]}
        </div>
      </div>
      
      <button 
        onClick={onRollDice}
        disabled={isRolling}
        className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
      
      <div className="text-sm font-bold text-center">
        {currentPlayerName}'s Turn
      </div>
      
      <div className="text-xs text-gray-600">
        Total: {dice[0] + dice[1]}
      </div>
    </div>
  )
}