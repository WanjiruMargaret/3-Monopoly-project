import { properties } from '../constants/tiles'

function Property({ property, index, players, isActive, onBuyProperty }) {
  const playersOnSpace = players.filter(p => p.position === index)
  const isOwned = players.some(p => p.properties.includes(index))
  const owner = players.find(p => p.properties.includes(index))
  
  const handleClick = () => {
    if (property.price > 0 && !isOwned && isActive) {
      onBuyProperty(index)
    }
  }
  
  const getSpecialCornerClass = () => {
    if (property.name === 'GO') return 'corner go'
    if (property.name === 'JAIL') return 'corner jail'
    if (property.name === 'FREE PARKING') return 'corner parking'
    if (property.name === 'GO TO JAIL') return 'corner gotojail'
    return ''
  }
  
  return (
    <div 
      className={`property ${property.type} ${getSpecialCornerClass()} ${
        property.type === 'corner' ? 'w-20 h-20' : 'flex-1 min-h-20'
      } ${isActive ? 'active' : ''} ${
        property.price > 0 && !isOwned && isActive ? 'hover:bg-green-50' : ''
      }`}
      onClick={handleClick}
    >
      
      {property.color && (
        <div className={`color-bar ${property.color} ${isOwned ? 'opacity-60' : ''}`}></div>
      )}
      
      {property.icon && (
        <div className="text-lg text-center mb-1">{property.icon}</div>
      )}
      
      <div className={`text-center font-bold leading-tight ${
        property.type === 'corner' ? 'text-xs' : 'text-[8px]'
      }`}>
        {property.name}
      </div>
      
      {property.price > 0 && (
        <div className="text-[7px] text-center font-bold text-green-600">${property.price}</div>
      )}
      
      {property.rent > 0 && (
        <div className="text-[6px] text-center text-blue-600">Rent ${property.rent}</div>
      )}
      
      {isOwned && owner && (
        <div className={`absolute top-1 right-1 w-3 h-3 rounded-full border border-black player-${owner.color}`}></div>
      )}
      
      <div className="flex flex-wrap gap-0.5 mt-1 justify-center">
        {playersOnSpace.map(player => (
          <div
            key={player.id}
            className={`player-token player-${player.color}`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default function Board({ players, currentPlayer, dice, isRolling, onRollDice, onBuyProperty }) {
  return (
    <div className="monopoly-board">
      
      {/* Bottom row (GO to JAIL) */}
      <div className="col-span-3 flex" style={{gridColumn: '1 / 4', gridRow: '3'}}>
        {properties.slice(0, 11).map((property, index) => (
          <Property 
            key={index} 
            property={property} 
            index={index} 
            players={players}
            isActive={players[currentPlayer].position === index}
            onBuyProperty={onBuyProperty}
          />
        ))}
      </div>
      
      {/* Left column */}
      <div className="flex flex-col" style={{gridColumn: '1', gridRow: '2'}}>
        {properties.slice(11, 20).map((property, index) => (
          <Property 
            key={index + 11} 
            property={property} 
            index={index + 11} 
            players={players}
            isActive={players[currentPlayer].position === index + 11}
            onBuyProperty={onBuyProperty}
          />
        ))}
      </div>
      
      {/* Center area */}
      <div className="center" style={{gridColumn: '2', gridRow: '2'}}>
        <div className="text-3xl font-bold text-red-600 mb-4 text-shadow">🎲 MONOPOLY 🏠</div>
        
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-3">
            <div className={`dice ${isRolling ? 'rolling' : ''}`}>
              {isRolling ? '🎲' : dice[0]}
            </div>
            <div className={`dice ${isRolling ? 'rolling' : ''}`}>
              {isRolling ? '🎲' : dice[1]}
            </div>
          </div>
          
          <button 
            onClick={onRollDice}
            disabled={isRolling}
            className="roll-button"
          >
            {isRolling ? '🎲 Rolling...' : '🎲 Roll Dice'}
          </button>
          
          <div className="text-sm font-bold text-center">
            <div className="text-lg">🎯 {players[currentPlayer].name}'s Turn</div>
            <div className="text-xs text-gray-600 mt-1">
              Total: {dice[0] + dice[1]} spaces
            </div>
          </div>
        </div>
      </div>
      
      {/* Right column */}
      <div className="flex flex-col" style={{gridColumn: '3', gridRow: '2'}}>
        {properties.slice(31, 40).reverse().map((property, index) => (
          <Property 
            key={39 - index} 
            property={property} 
            index={39 - index} 
            players={players}
            isActive={players[currentPlayer].position === 39 - index}
            onBuyProperty={onBuyProperty}
          />
        ))}
      </div>
      
      {/* Top row (FREE PARKING to GO TO JAIL) */}
      <div className="col-span-3 flex" style={{gridColumn: '1 / 4', gridRow: '1'}}>
        {properties.slice(20, 31).reverse().map((property, index) => (
          <Property 
            key={30 - index} 
            property={property} 
            index={30 - index} 
            players={players}
            isActive={players[currentPlayer].position === 30 - index}
            onBuyProperty={onBuyProperty}
          />
        ))}
      </div>
    </div>
  )
}