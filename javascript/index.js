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
	console.log(board)
	for (let row = 0; row<4; row++) {
		for (let col = 0; col<4; col++) { 
			let el = $('[data-cellid="'+row+"-"+col+'"]');
			console.log("h", row, "v", col);
			console.log("v", col,  "h", row);

			if (orientation === "horizontal") {
				let el = $('[data-cellid="'+row+"-"+col+'"]');
			}
			else {
				// let el = $('[data-cellid="'+col+"-"+row+'"]');
			}

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
	
