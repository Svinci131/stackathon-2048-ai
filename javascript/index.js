'use strict' 

console.log("hi")
const board = require('./board');
const gameBoard = new board(); 
// const directions = require("./directions")
// console.log(gameBoard);

function start () {
	// console.log(start)
	gameBoard.fillRandomEmptySpace();
	render(gameBoard.board);
}

// //drawBoard 
function render (board) {
	console.log(board)
	for (let i = 0; i<4; i++) {
		for (let j = 0; j<4; j++) { 

			let el = $('[data-cellid="'+i+"-"+j+'"]');

			if (el.text() !== board[i][j]) {
				if (board[i][j]) {
				console.log(el.text(), board[i][j])
				}
				el.empty();
				if (board[i][j]) {
					$(el).html('<div class="cell-num"><h1>'+board[i][j]+'</h1></div>')
				}
				else {
					$(el).html('<div class="cell-num zero"><h1>'+board[i][j]+'</h1></div>')
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
	}
	else if(e.keyCode === 39) { //right
		gameBoard.update ("horizontal", "right");
	}
	else if(e.keyCode === 38) { //up
		gameBoard.update ("vertical", "up");
	}
	else if(e.keyCode === 40) { //up
		gameBoard.update ("vertical", "down");
	}
	render(gameBoard.board);
});
	
