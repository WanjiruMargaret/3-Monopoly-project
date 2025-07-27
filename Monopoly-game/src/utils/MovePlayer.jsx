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
  let updatedPlayer = { ...player };

  // Passed GO?
  if (newPosition < player.position) {
    updatedPlayer.balance += 200;
    console.log(`${player.name} passed GO! +$200`);
  }

  const tile = tiles[newPosition];
  updatedPlayer.position = newPosition;

  switch (tile.type) {
    case "tax":
      updatedPlayer.balance -= 100;
      console.log(`${player.name} paid $100 tax.`);
      break;

    case "gotojail":
      updatedPlayer.position = 10;
      updatedPlayer.turnsInJail = 2;
      console.log(`${player.name} goes to jail for 2 turns.`);
      break;

    case "property":
      const owner = allPlayers.find(
        (p) => p.properties.includes(newPosition) && !p.bankrupt
      );
      if (owner && owner.id !== updatedPlayer.id) {
        const rent = tile.rent || 25;
        updatedPlayer.balance -= rent;

        // Optional: update owner's balance outside this function
        console.log(`${player.name} paid $${rent} rent to ${owner.name}`);

        if (updatedPlayer.balance < 0) {
          updatedPlayer.bankrupt = true;
          updatedPlayer.properties = [];
          console.log(`${player.name} went bankrupt!`);
        }
      }
      break;

    case "chance":
    case "chest":
      console.log(`${player.name} landed on ${tile.name}.`);
      break;

    default:
      break;
  }

  return updatedPlayer;
}

