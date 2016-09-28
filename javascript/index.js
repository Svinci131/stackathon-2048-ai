'use strict' 

const Board = require('./board');
const Tree = require('./ai/tree');
const humanGame = new Board();
const colors = require("./frontend/colorObj")

let aiMode = false;
$('#close').on("click", function(el) { 
	console.log("here")
	$('.test').css("visibility", "none");
});
$('#playanyway').on("click", function() { 
	$('.test').css("visibility", "none");
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

$('#ai').on("click", function() {
	$(".test").css("visibility", "initial");
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
					$(el).html('<div class="cell-num '+colors[board[row][col]]+'">'+board[row][col]+'</div>')
				}
				else {
					$(el).html('<div class="cell-num zero">'+board[row][col]+'</div>')
				}
			}
			
		}
	}
}
//doesn't end right on win 
function makeBestMove(aiGame, game) {
	console.log("2. ai Move");
	let bestMove = aiGame.alphaBeta(aiGame.head, 5, -Infinity, Infinity, true);
	let orientation = bestMove.boardObj.lastOrientation;
	let direction = bestMove.boardObj.lastDirection;
	game.board = bestMove.boardObj.board;
	// game.board = bestMove.boardObj.board;
	game.lastOrientation = orientation;
	game.lastDirection = direction;
	//game.update(orientation, direction);
	console.log("made move")
	render(game);

	if (direction === "left") {
		console.log("2. ai Move", orientation, direction)
	}
	else if (direction === "right") {
		console.log("2. ai Move", orientation, direction)
	}
}

function launchAi (aiGame, game, counter) {
	//draws items in squares
	console.log("???????????????????????????")
	console.log("1. render board")
	render(game);

	setTimeout(makeBestMove, 300, aiGame, game)

	setTimeout(function () {
		console.log("3. fill space");
		game.fillRandomEmptySpace();
		counter++;
		render(game);
	}, 500, aiGame, game, counter);
	setTimeout(function () {

		game.hasWon();
		game.hasLost();
		console.log("4 gameover", game.gameOver);
		if (!game.gameOver) {
			launchAi (aiGame, game, counter);
		}
		else {
			alert("We've reached"+ game.highestTile()+"in"+counter+"moves")
		}
	}, 1000, aiGame, game, counter);
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
		humanGame.fillRandomEmptySpace();
		render(humanGame);
		humanGame.hasWon();
		humanGame.hasLost();
	 	console.log(humanGame.gameOver)
	 	if (humanGame.gameOver) {
	 		alert("gameOver");
	 		//humanGame.clearBoard()
	 	}
	}
});
	