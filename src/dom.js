const Dom = (() => {
    const _addCells = (div, size) => {
        for (let i = 0; i < size; i++) {
            let row = document.createElement('div');
            for (let i = 0; i < size; i++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
            }
            div.appendChild(row);
        }
    }

    const render = () => {
        const infoDiv = document.createElement('div');
        const userBoard = document.createElement('div');
        const computerBoard = document.createElement('div');

        infoDiv.classList.add('info');
        infoDiv.innerText = "BATTLESHIP"

        userBoard.classList.add('game-board');
        _addCells(userBoard, 10);
        computerBoard.classList.add('game-board');
        _addCells(computerBoard, 10);

        document.body.appendChild(infoDiv);
        document.body.appendChild(userBoard);
        document.body.appendChild(computerBoard);
    };

    return { render };
})();

export default Dom;