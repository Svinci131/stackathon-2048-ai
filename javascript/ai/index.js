'use strict'

const Tree = require('./tree');
const render = require('../frontend/render.js');
const aiGame = new Tree();
const game = aiGame.head.boardObj
const gameOver =  game.gameOver;

while(!gameOver) {
	render();
	let bestMove = Tree.minimax(Tree.head, 3, true).boardObj.board;
	game.update(bestMove.lastOrientation, bestMove.lastOrientation);
	game.fillRandomEmptySpace();
} 
//let bestMove = Tree.minimax(Tree.head, 3, true);