'use strict'

function createDelibrateState (board, orientation, direction) {
	let temp = new Board () 
	temp.board = board; 
	board.update(orientation, direction);
	return this.board;
}

function createAllPossibleDelibrateStates(board) {
	let right = createDelibrateState(board, "horizontal", "right");
	let left = createDelibrateState(board, "horizontal", "left");
	let up = createDelibrateState(board, "vertical", "up");
	let down = createDelibrateState(board, "vertical", "down");
	return [right, left, up, down];
}

function createRandomState (board, rowIndex, colIndex, val) {
	let temp = new Board () 
	temp.board = board; 
	temp.board[rowIndex][colIndex] = val;
	return this.board;
}

function createAllPossibleRandomStates(board) {
	let options = [2, 4];
	let possibleStates = [];
	for(let i = 0; i < 4; i++){
		let possibleRow = board[i];
		for(let j = 0; j < possibleRow.length; j++) {
			for(let k = 0; k < 2; k++) {
				let possibleState = createRandomState(i, j, options[k]);
				possibleStates.push(possibleState);
			}
		}
	}
	return possibleState;
}

return {
	createAllPossibleRandomStates: createAllPossibleRandomStates,
	createRandomState: createRandomState,
	createAllPossibleDelibrateStates: createAllPossibleDelibrateStates,
	createDelibrateState: createDelibrateState
}