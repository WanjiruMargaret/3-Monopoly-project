export function buyProperty(player, tileIndex, tiles, allPlayers) {
  const tile = tiles[tileIndex];

  // Already owned?
  const isOwned = allPlayers.some((p) => p.properties.includes(tileIndex));
  if (isOwned || player.bankrupt) {
    console.log(`${tile.name} is already owned or player is bankrupt.`);
    return player;
  }

  // Not purchasable
  if (tile.type !== "property" && tile.type !== "utility" && tile.type !== "railroad") {
    console.log(`${tile.name} cannot be bought.`);
    return player;
  }

  // Not enough balance
  if (player.balance < tile.price) {
    console.log(`${player.name} can't afford ${tile.name}.`);
    return player;
  }

  // Purchase successful
  player.balance -= tile.price;
  player.properties.push(tileIndex);
  console.log(`${player.name} bought ${tile.name} for $${tile.price}.`);

  return player;
}
