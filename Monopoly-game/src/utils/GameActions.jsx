// utils/gameActions.js

export function buyProperty(player, property, propertyIndex) {
  if (player.balance >= property.price) {
    player.balance -= property.price;
    player.properties.push(propertyIndex);
    property.owner = player.id;
  }
  return { player, property };
}

export function payRent(player, owner, rent) {
  player.balance -= rent;
  owner.balance += rent;
  return { player, owner };
}

export function goToJail(player) {
  player.position = 10; // Jail position
  player.turnsInJail = 3;
  return player;
}

export function checkBankruptcy(player) {
  if (player.balance < 0) {
    player.isBankrupt = true;
    player.properties = [];
  }
  return player;
}
