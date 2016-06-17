'use strict' 


const Board = require('./board');
const board = new Board(); 
let aiMode = false;
// const directions = require("./directions")
// console.log(board);

$('#ai').on("click", function() {
	aiMode = !aiMode;
});

function start () {
	board.fillRandomEmptySpace();
	render(board);
}
// //drawBoard 
function render (gameBoard) {
	let board = gameBoard.board;
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

//ai









//human user 
start();
$("body").keydown(e => {
	console.log(aiMode)
	if (!aiMode) {
		if(e.keyCode === 37) { //left
			board.update ("horizontal", "left"); 
			render(board);

		}
		else if(e.keyCode === 39) { //right
			board.update ("horizontal", "right");
			render(board);

		}
		else if(e.keyCode === 38) { //up
			board.update ("vertical", "up");
			render(board);

		}
		else if(e.keyCode === 40) { //up
			board.update ("vertical", "down");
			render(board);

		}
		// setTimeout(function(){ 
			board.fillRandomEmptySpace();
			render(board);
		// }, 500)
	}
});
	
