'use strict'
const Board = require("../board");
const Tree = require('./tree');
const cloneDeep = require('clone-deep');
const transpose = require("../utils").transpose;
// const render = require('../frontend/render.js');

const board = new Board ();
board.fillRandomEmptySpace();
const aiGame = new Tree(board);
const game = aiGame.head.boardObj



// launchAi (aiGame, game, counter); 
// //aplha beta
// function makeBestMove(aiGame, game) {
// 	let bestMove = aiGame.alphaBeta(aiGame.head, 7, -Infinity, Infinity, true);
// 	let orientation = bestMove.boardObj.lastOrientation;
// 	let direction = bestMove.boardObj.lastDirection;
// 	console.log("Best Move", bestMove.board)
// 	console.log("++++++++++++++++++++++++++")
// 	console.log("move", orientation, direction)
// 	game.update(orientation, direction, "DONE UPDATING");
// }

// function launchAi (aiGame, game, counter) {

// 	makeBestMove(aiGame, game);
// 	console.log("++++++++++++++++++++++++++")
// 	console.log("after update", game.board)
// 	game.fillRandomEmptySpace();
// 	console.log("++++++++++++++++++++++++++")
// 	console.log("after add Random", game.board);

// 	counter++;
// 	game.hasWon();
// 	game.hasLost();
// 	console.log("is it over?", game.gameOver);
// 	if (!game.gameOver) {
// 		launchAi (aiGame, game, counter);
// 	}
// 	else {
// 		console.log("Game Over", game.board)
// 		//alert("We've reached"+ game.highestTile()+"in"+counter+"moves")
// 	}
// }




while(!game.gameOver) {
	game.hasWon();
	game.hasLost();
	console.log( "before", game.gameOver, game.board );
	//console.log("after Random is added", aiGame.head.boardObj);
	let bestMove = aiGame.alphaBeta(cloneDeep(aiGame.head), 3, -Infinity, Infinity, true);
	let orientation = bestMove.boardObj.lastOrientation;
	let direction = bestMove.boardObj.lastDirection;
	console.log("best move same", bestMove.boardObj.board, direction)
	console.log("best move transpose", transpose(bestMove.boardObj.board), direction)
	game.update(orientation, direction);
	console.log("after UPDATING", game.board, game.gameOver);
	console.log("transpose", transpose(game.board) )
	game.fillRandomEmptySpace();

	// counter++;
}

///

// [ [ 2, 4, 2, 8 ],
//   [ 4, 16, 4, 8 ],
//   [ 8, 32, 4, 2 ],
//   [ 16, 8, 2, 4 ] ]

  // [ [ 2, 4, 0, 0 ],
  // [ 4, 16, 8, 16 ],
  // [ 2, 8, 32, 8 ],
  // [ 16, 2, 8, 2 ] ]


 // [ [ 4, 32, 2, 4 ],
 //   [ 8, 4, 16, 4 ],
 //   [ 4, 16, 2, 8 ],
 //   [ 8, 4, 8, 2 ] ]

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




