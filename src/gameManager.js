import { Ship } from "./ship";
import { GameBoard } from "./gameBoard";

const GameManager = (() => {
    const { makeGameBoard, constants } = GameBoard;

    const makeGame = (player1Board, player2Board) => {
        const _initialise = (player1Board, player2Board) => {
            if (player1Board.allShipsSunk() || player2Board.allShipsSunk()) {
                throw new Error('Player has no starting ships');
            }
            return {'player1': player1Board, 'player2': player2Board};
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

        const _players = _initialise(player1Board, player2Board);
        let _currTarget = 'player1';
        let _winner = null;
        
        return {attack, getWinner};
    };

    return { makeGame };
})();

export { GameManager };