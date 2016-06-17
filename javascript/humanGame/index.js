'use strict' 

const board = require('./board');
const gameBoard = new board(); 
const clone = require('lodash.clone');
const render = require('../frontend/render.js');
let lastBoard = clone(gameBoard.board); 

function start () {
	gameBoard.fillRandomEmptySpace();
	render(gameBoard);
}

start();

$("body").keydown(e => {
	

	if(e.keyCode === 37) { //left
		gameBoard.update ("horizontal", "left");
		if (lastBoard !== gameBoard.board) {
			gameBoard.fillRandomEmptySpace();
		}
	}
	else if(e.keyCode === 39) { //right
		gameBoard.update ("horizontal", "right");
		if (lastBoard !== gameBoard.board) {
			gameBoard.fillRandomEmptySpace();
		}
	}
	else if(e.keyCode === 38) { //up
		gameBoard.update ("vertical", "up");
		if (lastBoard !== gameBoard.board) {
			gameBoard.fillRandomEmptySpace();
		}
	}
	else if(e.keyCode === 40) { //up
		gameBoard.update ("vertical", "down");
		if (lastBoard !== gameBoard.board) {
			gameBoard.fillRandomEmptySpace();
		}
	}
	lastBoard = clone(gameBoard.board);
	render(gameBoard);
});
	
