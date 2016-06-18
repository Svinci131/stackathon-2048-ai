'use strict' 


const Board = require('./board');
const Tree = require('./ai/tree');
const humanGame = new Board();


let aiMode = false;

$('#ai').on("click", function() {
	aiMode = true;
	humanGame.clearBoard()
	render(humanGame);
	let boardObj = new Board();
	boardObj.fillRandomEmptySpace();
	launchAi(boardObj);
});

$('#humanGame').on("click", function() {
	aiMode = false;
	humanGame.fillRandomEmptySpace();
	render(humanGame);
});

// //drawBoard 
function render (gameBoard) {
	let board = gameBoard.board;
	let orientation = gameBoard.lastOrientation;
	console.log("board", board)
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

function delay () {
	setTimeOut(function() {

	}, 1000);
}

function checkAIGameOver (game) {
	console.log("check status");
	return new Promise ((resolve, reject)=> {
		game.hasWon();
		game.hasLost();
		render(game);
	});
}

function makeBestMove(aiGame, game) {
	// return new Promise ((resolve, reject)=> {
		console.log("playerOne")
		let bestMove = aiGame.alphaBeta(aiGame.head, 5, -Infinity, Infinity, true);
		let orientation = bestMove.boardObj.lastOrientation;
		let direction = bestMove.boardObj.lastDirection;
		console.log("bestMove", orientation, direction)
		game.update(orientation, direction);
		render(game);
		// resolve("hi")
	// });

}



function launchAi (boardObj) {
	let aiGame = new Tree(boardObj);
	let game = aiGame.head.boardObj;
	let counter = 0;

	console.log(game)
	while(!game.gameOver) {

		console.log("check")
		game.hasWon();
		game.hasLost();
		render(game);
		makeBestMove(aiGame, game);
		render(game);
		game.fillRandomEmptySpace();
		counter++;

	}
	return counter;
}


//human user 
$("body").keydown(e => {
	if (!aiMode) {
		if(e.keyCode === 37) { //left
			humanGame.update ("horizontal", "left"); 
			render(humanGame);

		}
		else if(e.keyCode === 39) { //right
			humanGame.update ("horizontal", "right");
			render(humanGame);

		}
		else if(e.keyCode === 38) { //up
			humanGame.update ("vertical", "up");
			render(humanGame);

		}
		else if(e.keyCode === 40) { //up
			humanGame.update ("vertical", "down");
			render(humanGame);

		}

	 	humanGame.hasLost();
	 	// if (humanGame.gameOver) {
	 	// 	alert("gameOver");
	 	// 	//humanGame.clearBoard()
	 	// }
		humanGame.fillRandomEmptySpace();
		render(humanGame);
	}
});
	
