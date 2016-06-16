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

function createRandomState (board, rowIndex, colIndex, val) {
	let newBoard = new Board();
	console.log(newBoard);
	// 	newBoard.board = board; 
	// let newnode = new node(newBoard);
	// newnode.state[rowIndex][colIndex] = val;
	newnode.state.emptyspots[randomRowIndex].splice(indexToUpdate, 1);
	// return newnode;
}

function createAllPossibleRandomStates(board) {
	let options = [2, 4];
	let possibleStates = [];
	for(let i = 0; i < 4; i++){

		let possibleRow = board[i];
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