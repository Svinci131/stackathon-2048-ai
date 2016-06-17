'use strict' 


const Board = require('./board');
const Tree = require('./ai/tree');
const board = new Board(); 
let aiMode = false;
//ai stuff
const aiGame = new Tree(board);
const game = aiGame.head.boardObj
const gameOver =  game.board.gameOver;

$('#ai').on("click", function() {
	// aiMode = !aiMode;
	launchAi();
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

start();
//ai
function launchAi () {
	while(!gameOver) {
		let bestMove = aiGame.minimax(aiGame.head, 3, true).boardObj;
		//console.log("move",bestMove.lastOrientation, bestMove.lastDirection);
		game.update(bestMove.lastOrientation, bestMove.lastDirection);
		console.log(render)
		render(game);
		//console.log("after playre one",aiGame.head.boardObj.board);
		game.fillRandomEmptySpace();
		render(game);
		//console.log("after Random",aiGame.head.boardObj.board);
	} 
}

//human user 
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
	
