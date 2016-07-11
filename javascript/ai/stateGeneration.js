'use strict'

const Board = require("../board");
const Node = require("./node");
const clone = require('lodash.clone');
const cloneDeep = require('clone-deep');
//(boardArr) => nodeobj
function createDelibrateState (currNodeBoard, orientation, direction, lastOrientation, lastDirection) {
	let board = new Board (); 
	board.board = cloneDeep(currNodeBoard);
	board.lastOrientation = cloneDeep(lastOrientation);
	board.lastDirection = cloneDeep(lastDirection);
	board.update(orientation, direction);
	let node = new Node(board);
	return node;
}

//(BoardObj) => [nodeobj];
function createAllPossibleDelibrateStates(currNode) {
	// console.log("in states", currNode.boardObj.board);
	let board = currNode.boardObj.board;
	let lastDirection = currNode.boardObj.lastDirection;
	let lastOrientation = currNode.boardObj.lastOrientation;
	if (currNode.score === 565) {
		console.log("NODEEEEE", currNode.score, currNode.boardObj.board, currNode)
		console.log("========================")
		console.log("here", createDelibrateState(board, "vertical", "down").boardObj.board);
	}
	
	let right = createDelibrateState(board, "horizontal", "right", lastDirection, lastOrientation);
	let left = createDelibrateState(board, "horizontal", "left", lastDirection, lastOrientation);
	let up = createDelibrateState(board, "vertical", "up", lastDirection, lastOrientation);
	let down = createDelibrateState(board, "vertical", "down", lastDirection, lastOrientation);



	const foo = [right, left,  down, up].filter((state, idx) => {
		if (JSON.stringify(state.boardObj.board) != JSON.stringify(board)) {
			return true;
		}
	});

	return foo;
}

function createRandomState (currNodeBoard, rowIndex, colIndex, val, direction, orientation) {
	let board = new Board();//create board
	board.board = cloneDeep(currNodeBoard); //clone parentboard
	board.board[rowIndex][colIndex] = val;//set space in new board to val 
	board.lastDirection = direction;
	board.lastOrientation = orientation
	let node = new Node(board);
	return node;
}

function createAllPossibleRandomStates(currNode) {
	let options = [2, 4];
	let possibleStates = [];
	let board = currNode.boardObj.board;
	let emptySpots = currNode.boardObj.getEmptySpots();
	let direction = currNode.boardObj.lastDirection;
	let orientation = currNode.boardObj.lastOrientation;
	
	emptySpots.forEach((coords, i) => {
		let rowIndex = coords[0];
		let colIndex = coords[1];
		for(let k = 0; k < 2; k++) {
			let possibleState = createRandomState(board,rowIndex, colIndex, options[k], direction, orientation);
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