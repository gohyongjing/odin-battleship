import { Ship } from "./ship";
import { GameBoard } from "./gameBoard";

const GameManager = (() => {
    const { makeGameBoard, constants } = GameBoard;

    const makeGame = (details) => {
        const _initialise = (details) => {
            if (!(details['player1'] && details['player2'] && details['boardSize'])) {
                throw new Error(`Missing game details`);
            } else if (details['player1'].length === 0 || details['player2'].length === 0) {
                throw new Error('Player has no starting ships');
            }
            const players = {}
            for (const playerNum of ['player1', 'player2']) {
                let gameBoard = makeGameBoard(details['boardSize']);
                for (const ship of details[playerNum]) {
                    let shipLength = ship['shipLength'];
                    let startRow = ship['startRow'];
                    let startCol = ship['startCol'];
                    let direction = ship['direction'];
                    if (shipLength === undefined || startRow === undefined
                        || startCol === undefined || direction === undefined) {
                        throw new Error('Missing ship details');
                    }
                    gameBoard.addShip(startRow, startCol, direction, Ship.makeShip(shipLength));
                }
                players[playerNum] = gameBoard;
            }
            return players;
        }

        const attack = (target, row, col) => {
            if (target !== _currTarget) {
                throw new Error(`Invalid target player, current target is ${_currTarget}`);
            } else {
                let result = _players[target].receiveAttack(row, col);
                if (result === constants.ATTACK_INVALID) {
                    throw new Error(`Invalid attack at (${row}, ${col})`);
                } else if (result === constants.ATTACK_SUNK_SHIP) {
                    if (_players[target].allShipsSunk()) {
                        _winner = _currTarget === 'player1' ? 'player2' : 'player1';
                    }
                }
                _currTarget = _currTarget === 'player1' ? 'player2' : 'player1';
                return result;
            }
        }

        const getWinner = () => {
            return _winner;
        }

        const _players = _initialise(details);
        let _currTarget = 'player1';
        let _winner = null;
        
        return {attack, getWinner};
    };

    return { makeGame };
})();

export { GameManager };