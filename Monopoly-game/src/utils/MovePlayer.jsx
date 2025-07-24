export function handlePlayerMove(player, steps, tiles, _, allPlayers) {
  let newPosition = (player.position + steps) % tiles.length;

  // Passed GO?
  if (newPosition < player.position) {
    player.balance += 200;
    console.log(`${player.name} passed GO! +$200`);
  }

  const tile = tiles[newPosition];
  player.position = newPosition;

  switch (tile.type) {
    case "tax":
      player.balance -= 100;
      console.log(`${player.name} paid tax.`);
      break;

    case "gotojail":
      player.position = 10; // Jail position
      player.turnsInJail = 2;
      console.log(`${player.name} goes to jail.`);
      break;

    case "property":
      const owner = allPlayers.find((p) => p.properties.includes(newPosition));
      if (owner && owner.id !== player.id) {
        player.balance -= tile.rent || 25;
        owner.balance += tile.rent || 25;
        console.log(`${player.name} paid rent to ${owner.name}`);
      }
      break;

    // Add future logic for 'chance', 'chest', etc.
    default:
      break;
  }

  return player;
}
