const GameBoard = (() => {
    const SHIP_INVALID_POSITION = -1;
    const SHIP_ADDED = 0;

    const ATTACK_MISSED = 10;
    const ATTACK_HIT_SHIP = 11;
    const ATTACK_SUNK_SHIP = 12;
    const ATTACK_INVALID = -11;

    const DIRECTION_ROW = 20;
    const DIRECTION_COL = 21;

    const constants = {
        SHIP_INVALID_POSITION,
        SHIP_ADDED,

        ATTACK_MISSED,
        ATTACK_HIT_SHIP,
        ATTACK_SUNK_SHIP,
        ATTACK_INVALID,

        DIRECTION_ROW,
        DIRECTION_COL
    };

    const makeGameBoard = (size) => {
        const _grid = [];
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push({
                    attacked: false,
                    ship: null,
                    shipSegment: null
                });
            }
            _grid.push(row);
        }

        const _outOfRange = (coords) => {
            return !(0 <= coords[0] && coords[0] < size && 0 <= coords[1] && coords[1] < size);
        }

        const _invalidShipPosition = (startRow, startCol, direction, ship) => {
            for (let coords of getShipCoords(startRow, startCol, direction, ship)) {
                if (_outOfRange(coords) || _grid[coords[0]][coords[1]].ship) {
                    return true;
                }
            }
            return false;
        };

        const addShip = (startRow, startCol, direction, ship) => {
            startRow = Number(startRow);
            startCol = Number(startCol);
            if (!(ship.hit && ship.getLength && ship.isSunk)) {
                throw new Error(`Invalid ship object ${ship}`);
            } else if (_invalidShipPosition(startRow, startCol, direction, ship)) {
                return SHIP_INVALID_POSITION;
            } else {
                let coords = getShipCoords(startRow, startCol, direction, ship);
                for (let i = 0; i < coords.length; i++) {
                    let row = coords[i][0];
                    let col = coords[i][1];
                    _grid[row][col].ship = ship;
                    _grid[row][col].shipSegment = i;
                }
                return SHIP_ADDED;
            }
        };

        const receiveAttack = (row, col) => {
            if (_outOfRange([row, col]) || _grid[row][col].attacked) {
                return ATTACK_INVALID;
            } else {
                _grid[row][col].attacked = true;
                let ship = _grid[row][col].ship;
                if (ship) {
                    ship.hit(_grid[row][col].shipSegment);
                    if (ship.isSunk()) {
                        return ATTACK_SUNK_SHIP;
                    } else {
                        return ATTACK_HIT_SHIP;
                    }
                } else {
                    return ATTACK_MISSED;
                }
            }
        }

        const allShipsSunk = () => {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (_grid[i][j].ship && !_grid[i][j].ship.isSunk()) {
                        return false;
                    }
                }
            }
            return true;
        };

        return { addShip, receiveAttack, allShipsSunk }
    }

    const getShipCoords = (startRow, startCol, direction, ship) => {
        startRow = Number(startRow);
        startCol = Number(startCol);
        const result = [];
        const shipLength = ship.getLength();
        let row = startRow;
        let col = startCol;
        for (let i = 0; i < shipLength; i++) {
            result.push([row, col]);
            if (direction == DIRECTION_COL) { // To place the ship along a column, increase row number 
                row += 1;
            } else {
                col += 1;
            }
        }
        return result;
    };

    return { makeGameBoard, getShipCoords, constants }
})();

export { GameBoard };

