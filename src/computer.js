import { GameBoard } from "./gameBoard";
import { Ship } from "./ship";

const Computer = (() => {
    let temp = 0;

    const makeComputer = (boardSize, shipRequests) => {
        const getBoard = () => {
            const gameBoard = GameBoard.makeGameBoard(boardSize);
            gameBoard.addShip(0, 0, GameBoard.constants.DIRECTION_ROW, Ship.makeShip(2));
            return gameBoard;
        };

        const makeMove = () => {
            temp += 1;
            return [0, temp];
        };

        return {getBoard, makeMove};
    };


    return {makeComputer};
})();

export {Computer};