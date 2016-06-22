'use strict'
const Board = require("../board");
const Tree = require('./tree');
const cloneDeep = require('clone-deep');
// const render = require('../frontend/render.js');

const board = new Board ();
board.fillRandomEmptySpace();
const aiGame = new Tree(board);
const game = aiGame.head.boardObj

let counter = 0;
//let bestMove = aiGame.alphaBeta(aiGame.head, 8, -Infinity, Infinity, true);
let lastLastMove;

//aplha beta
while(!game.gameOver) {
	
	game.hasWon();
	game.hasLost();
	console.log( game.gameOver, game.board );

	//console.log("after Random is added", aiGame.head.boardObj);
	let bestMove = aiGame.alphaBeta(cloneDeep(aiGame.head), 10, -Infinity, Infinity, true);

	let orientation = bestMove.boardObj.lastOrientation;
	let direction = bestMove.boardObj.lastDirection;
		console.log("best move", bestMove.boardObj.board, direction)
	//console.log("move the update", orientation, direction, bestMove.score)
	game.board = bestMove.boardObj.board;
	//game.update(orientation, direction, "DONE UPDATING");
	console.log("after UPDATING", game);
	// lastLastMove = cloneDeep(game.board);
	game.fillRandomEmptySpace();
	counter++;

}


// minmax
// while(!game.gameOver) {

// 	game.hasWon();
// 	game.hasLost();

// 	console.log("beforep1/ after Random", aiGame.head.boardObj.board)
// 	let bestMove = aiGame.minimax(aiGame.head, 3, true);
// 	let orientation = bestMove.boardObj.lastOrientation;
// 	let direction = bestMove.boardObj.lastDirection;
// 	console.log("move", orientation, direction);
// 	lastLastMove = cloneDeep(game.board);
// 	game.update(orientation, direction);
// 	// if (JSON.stringify(lastLastMove) == JSON.stringify(game.board)) {
// 	// 	// game.update("vertical", "down");
// 	// 	console.log("here", game)
// 	// 	break;
// 	// }
	
// 	console.log("after playre one",aiGame.head.boardObj.board);

// 	game.fillRandomEmptySpace();
// 	counter++
// } 




