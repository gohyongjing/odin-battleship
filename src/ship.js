function makeShip(length) {
    const _segments = [];
    for (let i = 0; i < length; i++) {
        _segments.push(false);
    }

    const hit = (position) => {
        if (position >= length) {
            throw new Error(`Invalid position ${position} for ship of length ${length}`);
        } else if (_segments[position] == true) {
            throw new Error(`Position ${position} has already been hit`);
        } else {
            _segments[position] = true;
        }
    };

    const _checkAllTrue = (result, curr) => {
        return result && curr;
    }

    const isSunk = () => {
        return _segments.reduce(_checkAllTrue, true);
    };

    return {hit, isSunk};
}

export {makeShip};