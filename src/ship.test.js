const { Ship } = require('./ship');

const makeShip = Ship.makeShip;

test('test newly created ship not sunken', () => {
  expect(makeShip(1).isSunk()).toBe(false);
});

test('test sinking of ship', () => {
  const ship = makeShip(1);
  ship.hit(0);
  expect(ship.isSunk()).toBe(true);
});

test('test damaged ship is not sunk', () => {
  const ship = makeShip(2);
  ship.hit(1);
  expect(ship.isSunk()).toBe(false);
});

test('test heavily damaged ship is not sunk', () => {
  const ship = makeShip(5);
  ship.hit(2);
  ship.hit(0);
  ship.hit(4);
  ship.hit(3);
  expect(ship.isSunk()).toBe(false);
});

test('test sinking of large ship', () => {
  const ship = makeShip(7);
  ship.hit(2);
  ship.hit(0);
  ship.hit(4);
  ship.hit(3);
  ship.hit(1);
  ship.hit(6);
  ship.hit(5);
  expect(ship.isSunk()).toBe(true);
});

test('test shipLength returns correct length', () => {
  expect(makeShip(6).getLength()).toBe(6);
});
