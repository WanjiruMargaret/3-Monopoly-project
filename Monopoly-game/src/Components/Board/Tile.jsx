import React, { useEffect } from "react";
import { handleTileAction } from "../../Game/GameLogic";

export default function Tile({ tile, player, dispatch }) {
  const isPlayerHere = player && player.position === tile.id;

  useEffect(() => {
    if (isPlayerHere) {
      handleTileAction({ tile, player, dispatch });
    }
  }, [isPlayerHere, tile, player, dispatch]);

  // Build class name based on color/type
  let className = "tile";
  if (tile.color) className += ` tile-${tile.color}`;
  else if (tile.type) className += ` tile-${tile.type}`;

  return (
    <div className={className}>
      <strong>{tile.name}</strong>
      {tile.price && <div>${tile.price}</div>}
      {tile.type === "PROPERTY" && tile.owner !== undefined && (
        <p>Owned by Player {tile.owner}</p>
      )}
      {isPlayerHere && <div className="player-token">👤</div>}
    </div>
  );
}