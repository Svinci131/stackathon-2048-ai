'use strict'

const Board = require("../board");
const Node = require("./node");
const clone = require('lodash.clone');
const cloneDeep = require('clone-deep');
//(boardArr) => nodeobj
function createDelibrateState (currNodeBoard, orientation, direction) {
	let board = new Board (); 
	board.board = cloneDeep(currNodeBoard);
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

	const foo = [right, left,  down, up].filter((state, idx) => {
		// console.log(JSON.stringify(state.boardObj.board))
		// console.log(JSON.stringify(board));
		// console.log(JSON.stringify(state.boardObj.board) != JSON.stringify(board))
		// switch( idx ) {
		// 	case 0:
		// 		console.log('right');
		// 		break;
		// 	case 1:
		// 		console.log('left');
		// 		break;
		// 	case 2:
		// 		console.log('down');
		// 		break;
		// 	case 3:
		// 		console.log('up');
		// 		break;
		// }
		// console.log('\n');
		if (JSON.stringify(state.boardObj.board) != JSON.stringify(board)) {
			return true;
		}
	});

	// console.log('===================')
	// console.log('STATE IS');
	// console.log( foo.length );
	// console.log('===================')

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