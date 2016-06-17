'use strict'
const Board = require("../board");
const Node = require("./node");
const clone = require('lodash.clone');

//(boardArr) => nodeobj
function createDelibrateState (currNodeBoard, orientation, direction) {
	let board = new Board (); 
	board.board = clone(currNodeBoard);
	board.update(orientation, direction);
	let node = new Node(board);
	return node;
}


//(BoardObj) => [nodeobj];
function createAllPossibleDelibrateStates(currNode) {
	// console.log("in states", currNode.boardObj.board);
	let board = currNode.boardObj.board;
	let right = createDelibrateState(board, "horizontal", "right");
	let left = createDelibrateState(board, "horizontal", "left");
	let up = createDelibrateState(board, "vertical", "up");
	let down = createDelibrateState(board, "vertical", "down");
	// console.log("in states after", currNode.boardObj.board);
	return [right, left, up, down];
}

function createRandomState (currNodeBoard, rowIndex, colIndex, val) {
	// console.log(currNodeBoard)
	let board = new Board();
	board.board = clone(currNodeBoard);

	// board.emptyspots = clone(currNodeEmptySpots);
	board.board[rowIndex][colIndex] = val;
	board.emptyspots[rowIndex].splice(colIndex, 1);
	let node = new Node(board);
	return node;
}

function createAllPossibleRandomStates(currNode) {
	let options = [2, 4];
	let possibleStates = [];
	let board = currNode.boardObj.board;
	// let emptyspots = currNode.boardObj.emptyspots;
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