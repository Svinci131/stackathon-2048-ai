'use strict' 

const directions = require("./directions");
const transpose = require("./utils").transpose;
const twoOrFour = require("./utils").twoOrFour;


class board {
	constructor () {
		this.board = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
		this.lastOrientation = "horizontal";
		this.emptyspots = [[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3]];
	}

	//O(1) = add 2 or 4 to a random emptysquare w 0
	fillRandomEmptySpace() {
	 	const randomRowIndex = Math.round(Math.random() * (3 - 0) + 0);
		const randomRow = this.emptyspots[randomRowIndex];
	 	const indexToUpdate = Math.round(Math.random() * ((randomRow.length-1) - 0) + 0);
	 	const randomCell = randomRow[indexToUpdate];
	 	this.board[randomRowIndex][randomCell] = twoOrFour();
	 	this.emptyspots[randomRowIndex].splice(indexToUpdate, 1);
	}
	update (orientation, direction) {
		//if direction is diff transpose
		if (orientation !== this.lastOrientation) {
			this.board = transpose(this.board);
		}
		let swipeFunc = directions[orientation][direction];
		//console.log("here!!", swipeFunc);
		this.swipe(swipeFunc);
		//console.log("transposed back", direction, transpose(this.board))
		this.lastOrientation = orientation;
		this.fillRandomEmptySpace();
	}
	swipe (swipeInCurrDir) {
		//update each row on board
		for (let i = 0; i<4; i++) {
			this.board[i] = swipeInCurrDir(this.board[i]);
		}
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
