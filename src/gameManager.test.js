const { GameManager } = require('./gameManager');
const { GameBoard } = require('./gameBoard');
const { makeGameBoard, constants } = GameBoard;
const { Ship } = require('./ship');

const makeSingleShipBoard = () => {
    const singleShipBoard = makeGameBoard(5);
    singleShipBoard.addShip(0, 1, constants.DIRECTION_ROW, Ship.makeShip(2));
    return singleShipBoard;
}

const makeDoubleShipBoard = () => {
    const doubleShipBoard = makeGameBoard(7);
    doubleShipBoard.addShip(1, 3, constants.DIRECTION_ROW, Ship.makeShip(2));
    doubleShipBoard.addShip(3, 4, constants.DIRECTION_COL, Ship.makeShip(3));
    return doubleShipBoard;
}

const makeTripleShipBoard = () => {
    const tripleShipBoard = makeGameBoard(10);
    tripleShipBoard.addShip(0, 9, constants.DIRECTION_ROW, Ship.makeShip(4));
    tripleShipBoard.addShip(2, 4, constants.DIRECTION_COL, Ship.makeShip(2));
    tripleShipBoard.addShip(8, 1, constants.DIRECTION_ROW, Ship.makeShip(3));
    return tripleShipBoard;
}


test('test game manager to reject initialisation if player has no ship', () => {
    const makeGameWithEmptyBoard = () => {
        return GameManager.makeGame(makeGameBoard(4), makeGameBoard(4));
    };
    expect(makeGameWithEmptyBoard).toThrow();
});

test('test game manager to reject initialisation if player has no ship 2', () => {
    const makeGameWithEmptyBoard = () => {
        return GameManager.makeGame(makeDoubleShipBoard(), makeGameBoard(4));
    };
    expect(makeGameWithEmptyBoard).toThrow();
});

test('test game manager to accept proper initialisation', () => {
    expect(GameManager.makeGame(makeTripleShipBoard(), makeTripleShipBoard()));
});

test('test game manager to detect win game', () => {
    const game = GameManager.makeGame(makeSingleShipBoard(), makeSingleShipBoard());
    game.attack('player1', 0, 1);
    game.attack('player2', 1, 3);
    game.attack('player1', 0, 2);

    expect(game.getWinner()).toBe('player2');
});

test('test game manager to detect win game 2', () => {
    const game = GameManager.makeGame(makeDoubleShipBoard(), makeDoubleShipBoard());
    game.attack('player1', 1, 0);
    game.attack('player2', 5, 4);
    game.attack('player1', 2, 0);
    game.attack('player2', 1, 4);
    game.attack('player1', 3, 0);
    game.attack('player2', 4, 4);
    game.attack('player1', 4, 0);
    game.attack('player2', 3, 4);
    game.attack('player1', 5, 0);
    game.attack('player2', 1, 3);
    expect(game.getWinner()).toBe('player1');
});

test('test game manager to understand game in progress', () => {
    const game = GameManager.makeGame(makeTripleShipBoard(), makeDoubleShipBoard());
    game.attack('player1', 0, 0);
    game.attack('player2', 1, 3);
    expect(game.getWinner()).toBe(null);
});

test('test game manager to understand game in progress 2', () => {
    const game = GameManager.makeGame(makeTripleShipBoard(), makeTripleShipBoard());
    game.attack('player1', 3, 4);
    game.attack('player2', 1, 3);
    game.attack('player1', 2, 4);
    expect(game.getWinner()).toBe(null);
});
