'use strict' 

const board = require('../board');
const gameBoard = new board(); 
const clone = require('lodash.clone');
const render = require('../frontend/render.js');
let lastBoard = clone(gameBoard.board); 

module.exports = function humanPlay () {
function start () {
	gameBoard.fillRandomEmptySpace();
	render(gameBoard);
}

start();

$("body").keydown(e => {
	if(e.keyCode === 37) { //left
		console.log("here")
		gameBoard.update ("horizontal", "left");
		if (lastBoard !== gameBoard.board) {
			console.log("adding")
			gameBoard.fillRandomEmptySpace();
		}
	}
	else if(e.keyCode === 39) { //right
		gameBoard.update ("horizontal", "right");
		gameBoard.fillRandomEmptySpace();
	}
	else if(e.keyCode === 38) { //up
		gameBoard.update ("vertical", "up");
		gameBoard.fillRandomEmptySpace();

	}
	else if(e.keyCode === 40) { //up
		gameBoard.update ("vertical", "down");
		gameBoard.fillRandomEmptySpace();
	}
	lastBoard = clone(gameBoard.board);
	render(gameBoard);
});
	
};
