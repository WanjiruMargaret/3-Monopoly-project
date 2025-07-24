export function handlePlayerMove(player, steps, properties, setProperties, allPlayers) {
  const boardSize = properties.length;
  let newPosition = (player.position + steps) % boardSize;
  player.position = newPosition;

  const landedProperty = properties[newPosition];

  // Placeholder: property logic
  if (landedProperty.owner && landedProperty.owner !== player.name) {
    const rent = landedProperty.rent;
    player.money -= rent;
    const owner = allPlayers.find(p => p.name === landedProperty.owner);
    if (owner) {
      owner.money += rent;
    }
  } else if (!landedProperty.owner && player.money >= landedProperty.price) {
    player.money -= landedProperty.price;
    player.properties.push(landedProperty.name);
    landedProperty.owner = player.name;
    setProperties([...properties]);
  }

  // Check for bankruptcy
  if (player.money < 0) {
    player.isBankrupt = true;
  }

  return player;
}
