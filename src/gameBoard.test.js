const { Ship } = require('./ship');
const { GameBoard } = require('./gameBoard');

const makeShip = Ship.makeShip;
const { makeGameBoard, constants } = GameBoard;

test('test game board to receive an attack', () => {
    const gameBoard = makeGameBoard(5);
    expect(gameBoard.receiveAttack(1, 2)).toBe(constants.ATTACK_MISSED);
});

test('test game board to add ship', () => {
    const gameBoard = makeGameBoard(1);
    expect(gameBoard.addShip(0, 0, constants.DIRECTION_ROW, makeShip(1))).toBe(constants.SHIP_ADDED);
});

test('test game board to add ship 2', () => {
    const gameBoard = makeGameBoard(1);
    expect(gameBoard.addShip(0, 0, constants.DIRECTION_COL, makeShip(1))).toBe(constants.SHIP_ADDED);
});

test('test game board to add ship 3', () => {
    const gameBoard = makeGameBoard(5);
    expect(gameBoard.addShip(1, 1, constants.DIRECTION_ROW, makeShip(3))).toBe(constants.SHIP_ADDED);
});

test('test game board to reject ship', () => {
    const gameBoard = makeGameBoard(2);
    expect(gameBoard.addShip(2, 2, constants.DIRECTION_ROW, makeShip(3))).toBe(constants.SHIP_INVALID_POSITION);
});

test('test game board to reject ship 2', () => {
    const gameBoard = makeGameBoard(5);
    expect(gameBoard.addShip(1, 0, constants.DIRECTION_COL, makeShip(5))).toBe(constants.SHIP_INVALID_POSITION);
});

test('test game board to reject ship 3', () => {
    const gameBoard = makeGameBoard(6);
    gameBoard.addShip(4, 3, constants.DIRECTION_ROW, makeShip(2));
    expect(gameBoard.addShip(3, 3, constants.DIRECTION_COL, makeShip(2))).toBe(constants.SHIP_INVALID_POSITION);
});

test('test game board to receive an attack on ship', () => {
    const gameBoard = makeGameBoard(5);
    gameBoard.addShip(2, 3, constants.DIRECTION_ROW, makeShip(2));
    expect(gameBoard.receiveAttack(2, 4)).toBe(constants.ATTACK_HIT_SHIP);
});

test('test game board to sink ship', () => {
    const gameBoard = makeGameBoard(4);
    gameBoard.addShip(1, 1, constants.DIRECTION_ROW, makeShip(2));
    expect(gameBoard.receiveAttack(1, 1)).toBe(constants.ATTACK_HIT_SHIP);
    expect(gameBoard.receiveAttack(1, 2)).toBe(constants.ATTACK_SUNK_SHIP);
});

test('test gameBoard to report all ships sunken', () => {
    const gameBoard = makeGameBoard(3);
    expect(gameBoard.allShipsSunk()).toBe(true);
});

test('test gameBoard to report all ships sunken', () => {
    const gameBoard = makeGameBoard(3);
    gameBoard.addShip(0, 0, constants.DIRECTION_COL, makeShip(2));
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);
    expect(gameBoard.allShipsSunk()).toBe(true);
});

test('test gameBoard to report not all ships sunken', () => {
    const gameBoard = makeGameBoard(5);
    gameBoard.addShip(3, 4, constants.DIRECTION_COL, makeShip(2));
    expect(gameBoard.allShipsSunk()).toBe(false);
});

test('test gameBoard to report not all ships sunken 2', () => {
    const gameBoard = makeGameBoard(6);
    gameBoard.addShip(3, 4, constants.DIRECTION_COL, makeShip(3));
    gameBoard.addShip(1, 0, constants.DIRECTION_ROW, makeShip(2));
    gameBoard.receiveAttack(5, 4);
    gameBoard.receiveAttack(4, 4);
    expect(gameBoard.receiveAttack(3, 4)).toBe(constants.ATTACK_SUNK_SHIP);
    expect(gameBoard.allShipsSunk()).toBe(false);
});
