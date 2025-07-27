export function handlePlayerMove(player, diceTotal, tilesLength) {
  const newPosition = (player.position + diceTotal) % tilesLength;

  return {
    ...player,
    position: newPosition,
  };
}
