const { GameManager } = require('./gameManager');
const { GameBoard } = require('./gameBoard');
const { makeGameBoard, constants } = GameBoard;

const shipAtOrigin = {
    'shipLength': 2,
    'startRow': 0,
    'startCol': 0,
    'direction': constants.DIRECTION_ROW
};

const shipBelowOrigin = {
    'shipLength': 2,
    'startRow': 2,
    'startCol': 0,
    'direction': constants.DIRECTION_ROW
};

const incompleteShip = {
    'shipLength': 3,
    'startCol': 0,
    'direction': constants.DIRECTION_COL
};

const incompleteShip2 = {
    'startRow': 0,
    'startCol': 0,
    'direction': constants.DIRECTION_COL
};


test('test game manager to reject initialisation if no details', () => {
    const makeGameWithNoDetails = () => {
        return GameManager.makeGame({})
    };
    expect(makeGameWithNoDetails).toThrow();
});

test('test game manager to reject initialisation if no player', () => {
    const makeGameWithNoDetails = () => {
        return GameManager.makeGame({ 'player1': [shipAtOrigin], 'boardSize': 10 })
    };
    expect(makeGameWithNoDetails).toThrow();
});

test('test game manager to reject initialisation if no board size', () => {
    const makeGameWithNoDetails = () => {
        return GameManager.makeGame({ 'player1': [shipAtOrigin], 'player2': [shipAtOrigin] })
    };
    expect(makeGameWithNoDetails).toThrow();
});

test('test game manager to reject initialisation if player has no ships', () => {
    const makeGameWithNoDetails = () => {
        return GameManager.makeGame({ 'player1': [], 'player2': [shipAtOrigin] })
    };
    expect(makeGameWithNoDetails).toThrow();
});

test('test game manager to reject initialisation if ship is invalid', () => {
    const makeGameWithNoDetails = () => {
        return GameManager.makeGame({ 'player1': [incompleteShip], 'player2': [shipAtOrigin] })
    };
    expect(makeGameWithNoDetails).toThrow();
});

test('test game manager to reject initialisation if ship is invalid', () => {
    const makeGameWithNoDetails = () => {
        return GameManager.makeGame({ 'player1': [shipAtOrigin], 'player2': [incompleteShip2] })
    };
    expect(makeGameWithNoDetails).toThrow();
});


test('test game manager to accept proper initialisation', () => {
    expect(GameManager.makeGame({ 'player1': [shipAtOrigin], 'player2': [shipAtOrigin], 'boardSize': 10 }));
});

test('test game manager to reject out of range attack', () => {
    const game = GameManager.makeGame({ 'player1': [shipAtOrigin], 'player2': [shipAtOrigin], 'boardSize': 10 });
    const invalidAttack = () => {
        game.attack('player1', 2, 10);
    }

    expect(invalidAttack).toThrow();
});

test('test game manager to reject double attack on same player', () => {
    const game = GameManager.makeGame({ 'player1': [shipAtOrigin], 'player2': [shipAtOrigin], 'boardSize': 10 });
    const invalidAttack = () => {
        game.attack('player1', 2, 5);
        game.attack('player1', 4, 5);
    }

    expect(invalidAttack).toThrow();
});

test('test game manager to reject attack in same position', () => {
    const game = GameManager.makeGame({ 'player1': [shipAtOrigin], 'player2': [shipAtOrigin], 'boardSize': 10 });
    const invalidAttack = () => {
        game.attack('player1', 2, 3);
        game.attack('player2', 5, 6);
        game.attack('player1', 2, 3);
    }

    expect(invalidAttack).toThrow();
});

test('test game manager to detect win game', () => {
    const game = GameManager.makeGame({ 'player1': [shipAtOrigin], 'player2': [shipAtOrigin], 'boardSize': 5 });
    game.attack('player1', 0, 0);
    game.attack('player2', 1, 3);
    game.attack('player1', 0, 1);

    expect(game.getWinner()).toBe('player2');
});

test('test game manager to detect win game 2', () => {
    const game = GameManager.makeGame({ 'player1': [shipAtOrigin], 'player2': [shipAtOrigin, shipBelowOrigin], 'boardSize': 5 });
    game.attack('player1', 1, 0);
    game.attack('player2', 0, 1);
    game.attack('player1', 2, 0);
    game.attack('player2', 0, 0);
    game.attack('player1', 3, 0);
    game.attack('player2', 2, 1);
    game.attack('player1', 4, 0);
    game.attack('player2', 2, 0);
    expect(game.getWinner()).toBe('player1');
});

test('test game manager to understand game in progress', () => {
    const game = GameManager.makeGame({ 'player1': [shipAtOrigin], 'player2': [shipAtOrigin], 'boardSize': 5 });
    game.attack('player1', 0, 0);
    game.attack('player2', 1, 3);
    expect(game.getWinner()).toBe(null);
});

test('test game manager to understand game in progress 2', () => {
    const game = GameManager.makeGame({ 'player1': [shipAtOrigin, shipBelowOrigin], 'player2': [shipAtOrigin], 'boardSize': 5 });
    game.attack('player1', 0, 0);
    game.attack('player2', 1, 3);
    game.attack('player1', 0, 1);
    expect(game.getWinner()).toBe(null);
});
