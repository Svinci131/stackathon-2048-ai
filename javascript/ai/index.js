'use strict'
const Board = require("../board");
const Tree = require('./tree');
// const render = require('../frontend/render.js');

const board = new Board ();
const aiGame = new Tree(board);
const directions = require("../directions");
const game = aiGame.head.boardObj
const gameOver =  game.board.gameOver;

game.fillRandomEmptySpace();



// while(!gameOver) {
for (let i = 5; i>0; i--) {
	console.log("before", aiGame.head.boardObj.board)
	// render();
	let bestMove = aiGame.minimax(aiGame.head, 3, true).boardObj;
	let orientation = bestMove.lastOrientation;
	let direction = bestMove.lastDirection;
	console.log("move", orientation, direction);
	game.update(bestMove.lastOrientation, bestMove.lastDirection);
	console.log("after playre one",aiGame.head.boardObj.board);
	game.fillRandomEmptySpace();
	console.log("after Random",aiGame.head.boardObj.board);
} 
//let bestMove = Tree.minimax(Tree.head, 3, true);