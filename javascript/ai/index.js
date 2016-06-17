'use strict'
const Board = require("../board");
const Tree = require('./tree');
// const render = require('../frontend/render.js');

const board = new Board ();
const aiGame = new Tree(board);

const game = aiGame.head.boardObj
const gameOver =  game.board.gameOver;

game.fillRandomEmptySpace();

console.log("before", aiGame.head.boardObj.board)

// while(!gameOver) {
	// render();
	let bestMove = aiGame.minimax(aiGame.head, 3, true).boardObj;
	
	console.log(bestMove.lastOrientation, bestMove.lastDirection)

	game.update(bestMove.lastOrientation, bestMove.lastOrientation);
	console.log("after",aiGame.head.boardObj.board)
	// game.fillRandomEmptySpace();

// } 
//let bestMove = Tree.minimax(Tree.head, 3, true);