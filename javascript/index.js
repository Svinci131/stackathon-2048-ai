'use strict' 


const board = require('./board');
const gameBoard = new board(); 

// const directions = require("./directions")
// console.log(gameBoard);

function start () {
	console.log("random");
	gameBoard.fillRandomEmptySpace();
	console.log("render");
	render(gameBoard);
}

// //drawBoard 
function render (gameBoard) {
	let board = gameBoard.board;
	console.log(board);
	//wtf?
	let orientation = gameBoard.lastOrientation;

	
	for (let i = 0; i<4; i++) {
		for (let j = 0; j<4; j++) { 
			let row, col;
			let el = $('[data-cellid="'+i+"-"+j+'"]');
			if (orientation === "horizontal") {
				row = i;
				col = j;
			}
			else {
				console.log(orientation)
				row = j;
				col = i;
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
		gameBoard.update ("horizontal", "left"); 
		render(gameBoard);

	}
	else if(e.keyCode === 39) { //right
		gameBoard.update ("horizontal", "right");
		render(gameBoard);

	}
	else if(e.keyCode === 38) { //up
		gameBoard.update ("vertical", "up");
		render(gameBoard);

	}
	else if(e.keyCode === 40) { //up
		gameBoard.update ("vertical", "down");
		render(gameBoard);

	}
	// setTimeout(function(){ 
		gameBoard.fillRandomEmptySpace();
		render(gameBoard);
	// }, 500)

});
	
