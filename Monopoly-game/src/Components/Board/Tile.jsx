import React, { useEffect } from 'react';
import { handleTileAction } from '../../Game/GameLogic';

const Tile = ({ tile, player, dispatch }) => {
  const isPlayerHere = player.position === tile.id;

  useEffect(() => {
    if (isPlayerHere) {
      handleTileAction({ tile, player, dispatch });
    }
  }, [isPlayerHere]);

  return (
    <div className="tile">
      <strong>{tile.name}</strong>
      {tile.type === 'PROPERTY' && tile.owner !== undefined && (
        <p>Owned by Player {tile.owner}</p>
      )}
    </div>
  );
};

export default Tile;