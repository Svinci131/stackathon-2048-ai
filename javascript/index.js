'use strict' 


const Board = require('./board');
const Tree = require('./ai/tree');
const humanGame = new Board();


let aiMode = false;

$('#ai').on("click", function() {
	aiMode = true;
	humanGame.clearBoard();
	render(humanGame);
	let boardObj = new Board();
	let aiGame = new Tree(boardObj);
	let game = aiGame.head.boardObj;
	let counter = 0;
	boardObj.fillRandomEmptySpace();
	launchAi(aiGame, game , counter);
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
//doesn't end right on win 
function makeBestMove(aiGame, game) {
	let bestMove = aiGame.alphaBeta(aiGame.head, 5, -Infinity, Infinity, true);
	let orientation = bestMove.boardObj.lastOrientation;
	let direction = bestMove.boardObj.lastDirection;
	game.update(orientation, direction);
	render(game);
	if (direction === "left") {
		console.log("ai Move", orientation, direction)
	}
	else if (direction === "right") {
		console.log("ai Move", orientation, direction)
	}
}

function checkWin (game) {
	game.hasWon();
	game.hasLost();
}

function launchAi (aiGame, game, counter) {
	// checkWin.bind(this);
	render(game);
	setTimeout(makeBestMove, 100, aiGame, game)
	setTimeout(function () {
		// console.log("oponent");
		game.fillRandomEmptySpace();
		counter++;
		render(game);
	}, 300, aiGame, game, counter);
	setTimeout(function () {
		game.hasWon();
		game.hasLost();
		console.log("gameover", game.gameOver);
		if (!game.gameOver) {
			launchAi (aiGame, game, counter);
		}
	}, 700, aiGame, game, counter);
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
	
