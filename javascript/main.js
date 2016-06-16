'use strict' 

const directions = require("./directions");
const transpose = require("./utils").transpose;

console.log("here", directions);

class board {
	constructor () {
		this.board = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
		this.lastOrientation = "horizontal";
		this.emptyspots = [[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3]];
	}

	//O(1) = add 2 or 4 to a random emptysquare w 0
	fillRandomEmptySpace() {
	 	const randomRowIndex = Math.round(Math.random() * (3 - 0) + 0);
		const randomRow = emptyspots[randomRowIndex];
	 	const indexToUpdate = Math.round(Math.random() * ((randomRow.length-1) - 0) + 0);
	 	const randomCell = randomRow[indexToUpdate];
	 	this.board[randomRowIndex][randomCell] = twoOrFour();
	 	emptyspots[randomRowIndex].splice(indexToUpdate, 1);
	}
	
	swipe (orientation, direction) {
		//if direction is diff transpose
		if (orientation !== this.lastOrientation) {
			this.board = transpose(this.board);
			console.log("here",direction, this.board);
		}
		//update each row on board
		for (let i = 0; i<4; i++) {
			let swipeInCurrDir = directions[orientation][direction];
			this.board[i] = swipeInCurrDir(this.board[i]);
		}
		console.log("transposed back", direction, transpose(this.board))
		// this.fillRandomEmptySpace();
		this.lastOrientation = orientation;
	}
}

//drawBoard 
// function render (board) {
// 	for (let i = 0; i<4; i++) {
// 		for (let j = 0; j<4; j++) { 
// 			if (board[i][j]) {
// 				let el = $('[data-cellid="'+i+"-"+j+'"]');
// 				$(el).append('<div><h1>'+board[i][j]+'</h1></div>')
// 				console.log(el)
// 			}
// 		}
// 	}
// }


// render (board);


module.exports = board;
