export default function PropertyCard({ property, isOwned, owner, onBuy }) {
  if (!property || property.price === 0) return null;

  return (
    <div className="property-card">
      <div className="property-color-bar" style={{ backgroundColor: property.color || 'gray', height: '20px' }}></div>

      <h3>{property.name}</h3>

      <div className="property-details">
        <div className="property-detail-row">
          <span>Price:</span>
          <span>${property.price}</span>
        </div>

        {property.rent > 0 && (
          <div className="property-detail-row">
            <span>Rent:</span>
            <span>${property.rent}</span>
          </div>
        )}

        {isOwned && owner && (
          <div className="owned-section">
            <span>Owned by</span>
            <div className="owner-info">
              <div
                className="owner-color"
                style={{
                  backgroundColor: owner.color || 'gray',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                }}
              ></div>
              <span>{owner.name}</span>
            </div>
          </div>
        )}

        {!isOwned && onBuy && (
          <button onClick={onBuy}>Buy Property</button>
        )}
      </div>
    </div>
  );
}
