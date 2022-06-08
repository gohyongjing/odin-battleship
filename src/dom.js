import { GameManager } from "./gameManager";
import { GameBoard } from "./gameBoard";
import { Ship } from "./ship";
import { Computer } from "./computer";

const Dom = (() => {
    const { makeGameBoard, getShipCoords, constants } = GameBoard;

    const BOARD_SIZE = 10;
    const SHIP_REQUESTS = [{ 'name': 'Patrol Boat', 'length': 2 },
    { 'name': 'Battleship', 'length': 4 }];

    const _addCells = (div, size) => {
        for (let i = 0; i < size; i++) {
            let row = document.createElement('div');
            for (let j = 0; j < size; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                row.appendChild(cell);
            }
            div.appendChild(row);
        }
    }

    const render = () => {
        const headerDiv = document.createElement('div');
        const titleDiv = document.createElement('div');
        const infoDiv = document.createElement('div');
        const userBoard = document.createElement('div');
        const userTitle = document.createElement('div');
        const computerBoard = document.createElement('div');
        const computerTitle = document.createElement('div');

        titleDiv.innerText = "BATTLESHIP"

        infoDiv.classList.add('info');

        headerDiv.classList.add('header');
        headerDiv.appendChild(titleDiv);
        headerDiv.appendChild(infoDiv);

        userTitle.innerText = "Your board"

        userBoard.classList.add('game-board');

        _addCells(userBoard, BOARD_SIZE);

        computerTitle.innerText = "Computer's board";

        computerBoard.classList.add('game-board');

        _addCells(computerBoard, BOARD_SIZE);

        document.body.appendChild(headerDiv);
        document.body.appendChild(userTitle);
        document.body.appendChild(userBoard);
        document.body.appendChild(computerTitle);
        document.body.appendChild(computerBoard);

        startGame(headerDiv, infoDiv, userBoard, computerBoard);
    };

    const startGame = (headerDiv, infoDiv, userBoard, computerBoard) => {    
        let direction = constants.DIRECTION_ROW;
        const directionButton = document.createElement('input');        
        directionButton.type = 'button';
        directionButton.value = 'Direction: Horizontal';
        directionButton.addEventListener('click', (e) => {
            if (directionButton.value == 'Direction: Horizontal') {
                directionButton.value = 'Direction: Vertical';
                direction = constants.DIRECTION_COL;
            } else {
                directionButton.value = 'Direction: Horizontal';
                direction = constants.DIRECTION_ROW;
            }
        });
        headerDiv.appendChild(directionButton);

        let index = 0;
        infoDiv.innerText = `Place your ${SHIP_REQUESTS[index]['name']}`;
        const playerBoard = makeGameBoard(BOARD_SIZE);
        for (const gridRow of userBoard.children) {
            for (const cell of gridRow.children) {
                cell.addEventListener('click', (e) => {
                    if (index < SHIP_REQUESTS.length) {
                        let row = cell.dataset.row;
                        let col = cell.dataset.col;
                        let ship = Ship.makeShip(SHIP_REQUESTS[index]['length']);
                        let result = playerBoard.addShip(row, col, direction, ship);
                        if (result === constants.SHIP_ADDED) {
                            displayShip(row, col, direction, ship, userBoard);
                            index += 1;
                            if (index < SHIP_REQUESTS.length) {
                                infoDiv.innerText = `Place your ${SHIP_REQUESTS[index]['name']}`;
                            } else {
                                directionButton.remove();
                                startRound(infoDiv, userBoard, computerBoard, playerBoard);
                            }
                        } 
                    }
                });
            }
        }
    };

    const displayShip = (row, col, direction, ship, board) => {
        for (const coords of getShipCoords(row, col, direction, ship)) {
            board.children[coords[0]].children[coords[1]].classList.add('ship');
        }
    }

    const startRound = (infoDiv, userBoardDiv, computerBoardDiv, playerBoard) => {
        const computer = Computer.makeComputer(BOARD_SIZE, SHIP_REQUESTS)
        const computerBoard = computer.getBoard();
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (computerBoard.hasShip(i, j)) {
                    computerBoardDiv.children[i].children[j].classList.add('hidden');
                    computerBoardDiv.children[i].children[j].classList.add('ship');
                }
            }
        }

        const game = GameManager.makeGame(playerBoard, computerBoard);
        infoDiv.innerText = "Game has begun!\n";
        computerPlay(game, computer, infoDiv, userBoardDiv);
        for (const gridRow of computerBoardDiv.children) {
            for (const cell of gridRow.children) {
                cell.addEventListener('click', (e) => {
                    if (!game.getWinner()) {
                        let result = game.attack('player2', cell.dataset.row, cell.dataset.col);
                        if (result !== constants.ATTACK_INVALID) {
                            playerPlay(cell, result, infoDiv);
                            if (!game.getWinner()) {
                                computerPlay(game, computer, infoDiv, userBoardDiv);
                            }
                            if (game.getWinner()) {
                                endGame(infoDiv, game);
                            }
                        }
                    }
                });
            }
        }
    }

    const playerPlay = (cell, attackResult, infoDiv) => {
        cell.classList.add('attacked');
        infoDiv.innerText = "You fire";
        if (attackResult === constants.ATTACK_MISSED) {
            infoDiv.innerText += " and miss!\n";
        } else if (attackResult === constants.ATTACK_HIT_SHIP) {
            infoDiv.innerText += " and hit a ship!\n";
        } else if (attackResult === constants.ATTACK_SUNK_SHIP) {
            infoDiv.innerText += " and sink a ship!\n";
        }
    };

    const computerPlay = (game, computer, infoDiv, userBoardDiv) => {
        let computerMove = computer.makeMove();
        game.attack('player1', computerMove[0], computerMove[1]);
        userBoardDiv.children[computerMove[0]].children[computerMove[1]].classList.add('attacked');
        infoDiv.innerText += "Computer fires!\n";
    };

    const endGame = (infoDiv, game) => {
        infoDiv.innerText += `${game.getWinner() === 'player1' ? 'You win!' : 'Computer wins!'}`;
    }

    return { render };
})();

export default Dom;