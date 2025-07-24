export default function PropertyCard({ property, isOwned, owner, onBuy }) {
  if (!property || property.price === 0) return null

  return (
    <div className="bg-white border-2 border-black rounded-lg p-4 max-w-xs">
      <div className={`h-8 rounded-t ${property.color ? `bg-${property.color}-500` : 'bg-gray-300'} mb-3`}></div>
      
      <h3 className="font-bold text-lg mb-2">{property.name}</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Price:</span>
          <span className="font-bold">${property.price}</span>
        </div>
        
        {property.rent > 0 && (
          <div className="flex justify-between">
            <span>Rent:</span>
            <span className="font-bold">${property.rent}</span>
          </div>
        )}
        
        {isOwned && owner && (
          <div className="text-center p-2 bg-gray-100 rounded">
            <span className="text-sm">Owned by</span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className={`w-4 h-4 rounded-full bg-${owner.color}-500`}></div>
              <span className="font-bold">{owner.name}</span>
            </div>
          </div>
        )}
        
        {!isOwned && onBuy && (
          <button
            onClick={onBuy}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Buy Property
          </button>
        )}
      </div>
    </div>
  )
}