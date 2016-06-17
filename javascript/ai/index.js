'use strict'
const Board = require("../board");
const Tree = require('./tree');

// const render = require('../frontend/render.js');

const board = new Board ();
const aiGame = new Tree(board);
const game = aiGame.head.boardObj
const gameOver =  game.board.gameOver;

game.fillRandomEmptySpace();

// let bestMove = aiGame.alphaBeta(aiGame.head, 3, -Infinity, Infinity, true);

// console.log("here",bestMove);
while(!gameOver) {
	console.log("before", aiGame.head.boardObj.board)
	//render();
	let bestMove = aiGame.minimax(aiGame.head, 3, true).boardObj;
	let orientation = bestMove.lastOrientation;
	let direction = bestMove.lastDirection;
	console.log("move", orientation, direction);
	game.update(bestMove.lastOrientation, bestMove.lastDirection);
	console.log("after playre one",aiGame.head.boardObj.board);
	debugger
	game.fillRandomEmptySpace();
	console.log("after Random",aiGame.head.boardObj.board);
} 
//let bestMove = Tree.minimax(Tree.head, 3, true);