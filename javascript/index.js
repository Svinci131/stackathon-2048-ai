'use strict' 

console.log("hi")
const board = require('./board');
const gameBoard = new board(); 
// const directions = require("./directions")
// console.log(gameBoard);

function start () {
	// console.log(start)
	gameBoard.fillRandomEmptySpace();
	render(gameBoard);
}


// //drawBoard 
function render (gameBoard) {
	let board = gameBoard.board;
	let orientation = gameBoard.lastOrientation;
	let row, col;
	for (let i = 0; i<4; i++) {
		for (let j = 0; j<4; j++) { 
			if (orientation === "horizontal") {
				row = i;
				col = j;
			}
			else {
				row = j;
				col = i;
			}
			let el = $('[data-cellid="'+row+"-"+col+'"]');
			if (el.text() !== board[row][col]) {
				el.empty();
				if (board[row][col]) {
					$(el).html('<div class="cell-num"><h1>'+board[row][col]+'</h1></div>')
				}
				else {
					$(el).html('<div class="cell-num zero"><h1>'+board[row][col]+'</h1></div>')
				}
			}
			
		}
	}
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
	
