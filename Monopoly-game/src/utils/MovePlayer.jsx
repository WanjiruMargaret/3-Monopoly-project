export function handlePlayerMove(player, steps, tiles, _, allPlayers) {
  if (player.bankrupt) return player;

  // Jail logic
  if (player.turnsInJail > 0) {
    console.log(`${player.name} is in jail (${player.turnsInJail} turns left)`);
    return {
      ...player,
      turnsInJail: player.turnsInJail - 1,
    };
  }

  // Move player
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
      console.log(`${player.name} paid $100 tax.`);
      break;

    case "gotojail":
      player.position = 10; // Jail index
      player.turnsInJail = 2;
      console.log(`${player.name} goes to jail for 2 turns.`);
      break;

    case "property":
      const owner = allPlayers.find(
        (p) => p.properties.includes(newPosition) && !p.bankrupt
      );
      if (owner && owner.id !== player.id) {
        const rent = tile.rent || 25;
        player.balance -= rent;
        owner.balance += rent;
        console.log(`${player.name} paid $${rent} rent to ${owner.name}`);
        if (player.balance < 0) {
          player.bankrupt = true;
          player.properties = [];
          console.log(`${player.name} went bankrupt!`);
        }
      }
      break;

    case "chance":
    case "chest":
      console.log(`${player.name} landed on ${tile.name}. (Future logic TBD)`);
      break;

    // Free parking, GO, jail, utilities can be handled later
    default:
      break;
  }

  return player;
}

