const {makeShip} = require('./ship');

test('test newly created ship not sunken', () => {
    expect(makeShip(1).isSunk()).toBe(false);
  });