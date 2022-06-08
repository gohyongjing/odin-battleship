import { GameBoard } from "./gameBoard";
import { Ship } from "./ship";

const Computer = (() => {
    const {constants} = GameBoard;

    const makeComputer = (boardSize, shipRequests) => {
        const _initialise = () => {
            const result = [];
            for (let i = 0; i < boardSize; i++) {
                let row = [];
                for (let j = 0; j < boardSize; j++) {
                    row.push(false);
                }
                result.push(row);
            }
            return result;
        };

        const _getRandomCoords = () => {
            return [Math.floor(Math.random() * boardSize),
                    Math.floor(Math.random() * boardSize)];
        };

        const getBoard = () => {
            const gameBoard = GameBoard.makeGameBoard(boardSize);
            for (const request of shipRequests) {
                let direction = Math.random() >= 0.5
                        ? constants.DIRECTION_ROW
                        : constants.DIRECTION_COL;
                let coords = _getRandomCoords();
                while (gameBoard.addShip(coords[0],
                                        coords[1],
                                        direction,
                                        Ship.makeShip(request['length'])) !== constants.SHIP_ADDED) {
                coords = _getRandomCoords();
                }
            }
            return gameBoard;
        };

        const makeMove = () => {
            let coords = _getRandomCoords();
            while(_attacked[coords[0]][coords[1]]) {
                coords = _getRandomCoords();
            }
            _attacked[coords[0]][coords[1]] = true;
            return coords;
        };

        const _attacked = _initialise();
        return {getBoard, makeMove};
    };

    return {makeComputer};
})();

export {Computer};