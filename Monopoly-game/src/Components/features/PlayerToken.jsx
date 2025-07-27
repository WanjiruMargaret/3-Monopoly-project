import { properties } from '../constants/tiles'

export default function PlayerToken({ players, currentPlayer, dice }) {
  const playerColors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500', 
    green: 'bg-green-500',
    yellow: 'bg-yellow-500'
  }

  return (
    <div className="bg-white border-2 border-black rounded-lg p-4 w-64">
      <h2 className="text-xl font-bold mb-4 text-center">Players</h2>
      
      <div className="space-y-3">
        {players.map((player, index) => (
          <div 
            key={player.id} 
            className={`p-3 border-2 rounded-lg transition-all ${
              index === currentPlayer 
                ? 'border-green-500 bg-green-50 shadow-lg' 
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-6 h-6 rounded-full border-2 border-black ${playerColors[player.color]}`}></div>
              <span className="font-bold">{player.name}</span>
              {index === currentPlayer && <span className="text-green-600 text-sm">🎯</span>}
            </div>
            
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>💰 Money:</span>
                <span className="font-bold">${player.money}</span>
              </div>
              <div className="flex justify-between">
                <span>📍 Location:</span>
                <span className="text-xs">{properties[player.position].name}</span>
              </div>
              <div className="flex justify-between">
                <span>🏠 Properties:</span>
                <span className="font-bold">{player.properties.length}</span>
              </div>
            </div>
            
            {player.properties.length > 0 && (
              <div className="mt-2">
                <div className="text-xs text-gray-600">Owned Properties:</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {player.properties.slice(0, 3).map(propIndex => (
                    <div key={propIndex} className="text-xs bg-blue-100 px-1 rounded">
                      {properties[propIndex].name.split(' ')[0]}
                    </div>
                  ))}
                  {player.properties.length > 3 && (
                    <div className="text-xs text-gray-500">+{player.properties.length - 3}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <div className="text-sm font-bold mb-2">Last Roll:</div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-1">
            <span className="px-2 py-1 bg-white border rounded text-sm">{dice[0]}</span>
            <span className="px-2 py-1 bg-white border rounded text-sm">{dice[1]}</span>
          </div>
          <span className="text-sm">=</span>
          <span className="px-2 py-1 bg-blue-100 border rounded text-sm font-bold">
            {dice[0] + dice[1]}
          </span>
        </div>
      </div>
    </div>
  )
}