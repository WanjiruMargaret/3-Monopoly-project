import React from "react";

export default function Tile({ tile, isPlayerHere }) {
  // Build class name based on color/type
  let className = "tile";
  if (tile.color) className += ` tile-${tile.color}`;
  else if (tile.type) className += ` tile-${tile.type}`;

  return (
    <div className={className}>
      <div>{tile.name}</div>
      {tile.price && <div>${tile.price}</div>}
      {isPlayerHere && <div className="player-token">👤</div>}
    </div>
  );
}