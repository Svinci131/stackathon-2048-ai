'use strict'
const Board = require("../board");
const Tree = require('./tree');

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
	//console.log("before/ after Random", aiGame.head.boardObj.board);
	let bestMove = aiGame.alphaBeta(aiGame.head, 3, -Infinity, Infinity, true);
	//console.log("best", bestMove);
	if(bestMove === Infinity) {
		console.log("count",counter)
		break;
	}
	let orientation = bestMove.boardObj.lastOrientation;
	let direction = bestMove.boardObj.lastDirection;
	//console.log("move", orientation, direction, bestMove.score);
	game.update(orientation, direction);
	//console.log("after playre one",aiGame.head.boardObj.board);
	game.fillRandomEmptySpace();
	counter++;
}

// let counter = 0;
// // minmax
// while(!game.gameOver) {

// 	game.hasWon();
// 	game.hasLost();

// 	//console.log("beforep1/ after Random", aiGame.head.boardObj.board)
// 	// render();
// 	let bestMove = aiGame.minimax(aiGame.head, 3, true);
// 	// console.log("bestMove", game.)
// 	// co
// 	if(bestMove === Infinity) {
// 		console.log("count",counter)
// 		break;
// 	}
// 	// console.log(bestMove)

// 	//debugger
// 	let orientation = bestMove.boardObj.lastOrientation;
// 	let direction = bestMove.boardObj.lastDirection;
// 	//console.log("move", orientation, direction);
// 	game.update(orientation, direction);
// 	//console.log("after playre one",aiGame.head.boardObj.board);
// 	game.fillRandomEmptySpace();
// 	counter++
// } 




