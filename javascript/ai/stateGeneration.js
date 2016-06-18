'use strict'

const Board = require("../board");
const Node = require("./node");
const clone = require('lodash.clone');
const cloneDeep = require('clone-deep');
//(boardArr) => nodeobj
function createDelibrateState (currNodeBoard, orientation, direction) {
	let board = new Board (); 
	board.board = clone(currNodeBoard);
	board.update(orientation, direction);

	let node = new Node(board);
	// node.boardObj.hasLost()
	// node.boardObj.hasWon()
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
	return [right, left,  down, up];
}

function createRandomState (currNodeBoard, rowIndex, colIndex, val) {
	let board = new Board();//create board
	board.board = cloneDeep(currNodeBoard); //clone parentboard
	board.board[rowIndex][colIndex] = val;//set space in new board to val 

	let node = new Node(board);
	return node;
}

function createAllPossibleRandomStates(currNode) {
	let options = [2, 4];
	let possibleStates = [];
	let board = currNode.boardObj.board;
	let emptySpots = currNode.boardObj.getEmptySpots();
	emptySpots.forEach((coords, i) => {

		let rowIndex = coords[0];
		let colIndex = coords[1];
		for(let k = 0; k < 2; k++) {
			let possibleState = createRandomState(board,rowIndex, colIndex, options[k]);
			possibleStates.push(possibleState);
		}
	});


	return possibleStates;
}

module.exports = {
	createAllPossibleRandomStates: createAllPossibleRandomStates,
	createRandomState: createRandomState,
	createAllPossibleDelibrateStates: createAllPossibleDelibrateStates,
	createDelibrateState: createDelibrateState
}