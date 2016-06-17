'use strict' 

const board = require('../board');
const gameBoard = new board(); 
const clone = require('lodash.clone');
const render = require('../frontend/render.js');
let lastBoard = clone(gameBoard.board); 

// console.log(render)

	function start () {
		gameBoard.fillRandomEmptySpace();

		render(gameBoard);
	}
	start();

	$("body").keydown(e => {

		if(e.keyCode === 37) { //left
			console.log("left")
			gameBoard.update ("horizontal", "left");
			gameBoard.fillRandomEmptySpace();
		}
		else if(e.keyCode === 39) { //right
			console.log("right")
			gameBoard.update ("horizontal", "right");
			gameBoard.fillRandomEmptySpace();
		}
		else if(e.keyCode === 38) { //up
			console.log("up")
			gameBoard.update ("vertical", "up");
			gameBoard.fillRandomEmptySpace();

		}
		else if(e.keyCode === 40) { //down
			console.log("down")
			gameBoard.update ("vertical", "down");
			gameBoard.fillRandomEmptySpace();
		}
		lastBoard = clone(gameBoard.board);
		// render(gameBoard);
	});
	

