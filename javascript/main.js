'use strict' 

const directions = require("./directions");
const transpose = require("./utils").transpose;
const twoOrFour = require("./utils").twoOrFour;


class board {
	constructor () {
		this.board = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
		this.lastOrientation = "horizontal";
		this.emptyspots = [[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3]];
		this.gameOver = false; 
	}
	//O(1) = add 2 or 4 to a random emptysquare w 0
	fillRandomEmptySpace() {
	 	const randomRowIndex = Math.round(Math.random() * (3 - 0) + 0);
		const randomRow = this.emptyspots[randomRowIndex];
		if (randomRow.length) {
			const indexToUpdate = Math.round(Math.random() * ((randomRow.length-1) - 0) + 0);
		 	const randomCell = randomRow[indexToUpdate];
		 	this.board[randomRowIndex][randomCell] = twoOrFour();
		 	this.emptyspots[randomRowIndex].splice(indexToUpdate, 1);
		}
		else this.gameOver = true;
	}
	//(string, string) 
	update (orientation, direction) {
		//if direction is diff transpose
		if (orientation !== this.lastOrientation) {
			this.board = transpose(this.board);
		}
		let swipeFunc = directions[orientation][direction];//define direction to swipe in 
		this.swipe(swipeFunc);//swipe
		this.lastOrientation = orientation;//reset orientation to avoid having transpose as often 
		//updates gameOver if no empty spaces
		this.fillRandomEmptySpace();//set a random zero space to 2 or 4(remove from empty spots)
	}
	//(func)- compress each row based on direction
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
