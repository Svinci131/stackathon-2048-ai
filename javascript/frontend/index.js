'use strict' 

console.log("hi")
const board = require('./board');
const gameBoard = new board(); 
const render = require('./render.js');
// const directions = require("./directions")
// console.log(gameBoard);

function start () {
	// console.log(start)
	gameBoard.fillRandomEmptySpace();
	render(gameBoard);
}



start();

$("body").keydown(e => {
	if(e.keyCode === 37) { //left
		// console.log("here", e)
		gameBoard.update ("horizontal", "left");
		gameBoard.fillRandomEmptySpace();
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
	render(gameBoard);
});
	
