'use strict'
const Board = require("../board");
const Node = require("./node");


//(boardArr) => nodeobj
function createDelibrateState (currNodeBoardObj, orientation, direction) {
	let board = new Board (); 
	board.board = currNodeBoardObj.board;
	board.update(orientation, direction);
	let node = new Node(board);
	return node;
}


//(BoardObj) => [nodeobj];
function createAllPossibleDelibrateStates(currNode) {
	let right = createDelibrateState(currNode.boardObj, "horizontal", "right");
	let left = createDelibrateState(currNode.boardObj, "horizontal", "left");
	let up = createDelibrateState(currNode.boardObj, "vertical", "up");
	let down = createDelibrateState(currNode.boardObj, "vertical", "down");
	return [right, left, up, down];
}

function createRandomState (currNodeBoardObj, rowIndex, colIndex, val) {
	let board = new Board();
	board.board = currNodeBoardObj.board;
	console.log(currNodeBoardObj.board)
	board.board[rowIndex][colIndex] = val;

	board.emptyspots[rowIndex].splice(colIndex, 1);
	let node = new Node(board);
	return node;
}

function createAllPossibleRandomStates(currNode) {
	let options = [2, 4];
	let possibleStates = [];
	for(let i = 0; i < 4; i++){

		let possibleRow = currNode.boardObj.board[i];
		for(let j = 0; j < possibleRow.length; j++) {

			for(let k = 0; k < 2; k++) {
				let possibleState = createRandomState(board, i, j, options[k]);
				possibleStates.push(possibleState);
			}
		}
	}
	return possibleStates;
}

module.exports = {
	createAllPossibleRandomStates: createAllPossibleRandomStates,
	createRandomState: createRandomState,
	createAllPossibleDelibrateStates: createAllPossibleDelibrateStates,
	createDelibrateState: createDelibrateState
}