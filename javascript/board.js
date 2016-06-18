'use strict' 

const directions = require("./directions");
const utils = require("./utils");
const transpose = utils.transpose;
const twoOrFour = utils.twoOrFour;
const getFlatArr = utils.getFlatArr;
const absoluteDiff = utils.absoluteDiff;
const clone = require('lodash.clone');

class board {

	constructor () {
		this.board = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
		this.lastOrientation = "horizontal";
		this.lastDirection;
		this.gameOver = false; 
		this.transposed; 
	}

	//O(1) = add 2 or 4 to a random emptysquare w 0
	getEmptySpots() {
		var emptySpots = [];
		for(var i=0; i < this.board.length; i++) {
			for(var j=0; j < this.board[i].length; j++) {
				if(this.board[i][j] == 0){
					emptySpots.push([i,j]);
				}
			}
		}	
		return emptySpots;	
	}

	fillRandomEmptySpace() {
		var emptySpots = this.getEmptySpots();
		var random = Math.floor(Math.random() * emptySpots.length);
		var cell = emptySpots[random];
		this.board[cell[0]][cell[1]] = twoOrFour();
	}

	//(string, string) //o(n*n + n*n)if we transpose //else o(n*n)
	update (orientation, direction) { 
		// const lastBoard = clone(this.board);
		//if direction is diff transpose
		this.lastDirection = direction;
		if (orientation !== this.lastOrientation) {
			this.board = transpose(this.board);
		}
		let swipeFunc = directions[orientation][direction];//define direction to swipe in 
		this.swipe(swipeFunc);//swipe
		this.lastOrientation = orientation;//reset orientation to avoid having transpose as often 

	}
	highestTile () {
		let all = getFlatArr(this.board);
		return Math.max.apply( Math, all );
	}
	hasWon() {
		if (this.highestTile() === 8) {
			this.gameOver = true;
		}
	}
 	//rewrite after stackathon
	hasLost () {

		let copy = clone(this.board);

		let right = new board();
		right.board = copy;
		right.update("horizontal", "right");

		let left = new board();
		left.board = copy;
		left.update("horizontal", "left");

		let up = new board();
		up.board = copy
		up.update("vertical", "up");

		let down = new board();
		down.board = copy;
		down.update("vertical", "down");


		if (this.lastOrientation === "vertical") {
			right.board = transpose(right.board);
			left.board = transpose(left.board);
		}
		else if (this.lastOrientation === "horizontal") {
			up.board = transpose(up.board);
			down.board = transpose(down.board);
		}
		//if none are diff - you've lost 
		let cantMoveRight = (JSON.stringify(right.board) == JSON.stringify(this.board));
		let cantMoveLeft = (JSON.stringify(left.board) == JSON.stringify(this.board));
		let cantMoveUp = (JSON.stringify(up.board) == JSON.stringify(this.board));
		let cantMoveDown = (JSON.stringify(down.board) == JSON.stringify(this.board));

		//move each way 
		if (cantMoveRight && cantMoveLeft && cantMoveUp && cantMoveDown) {
			console.log("lost");
			this.gameOver = true;
		}
	}
	//(func)- compress each row based on direction
	swipe (swipeInCurrDir) {
		//update each row on board
		for (let i = 0; i<4; i++) {
			this.board[i] = swipeInCurrDir(this.board[i]);
		}

	}
	//o(n)
	actualScore () {
		let all = getFlatArr(this.board);
		return all.reduce((a,b) => {
			return a + b
		});
	}
	//o(n*n)
	clusteredScore () {
		let all = getFlatArr(this.board); 
		let clusteredScore = all.reduce((a, b, i) => {//o(n)
			let neighbors = utils.getNeighbors(all, b);//get neighborso(o(1));
			//estimate the sum of absolute differences from its neighbors (excluding the empty cells)
			//we take the average difference.
			let averageDiff = utils.getAverageDiffSansZeros(neighbors, i);//o(n)
			a += averageDiff //o(n)
			return a;
		}, 0);		
		return clusteredScore;
	}
	//o(n)
	heuristicScore () {
		// console.log(this.clusteredScore());
		let actualScore = this.actualScore();
		let clusteredScore = 0//this.clusteredScore();
		let numberOfEmptyCells = this.getEmptySpots().length;//o(n)
		let score = (actualScore+Math.log(actualScore)*numberOfEmptyCells - clusteredScore);
		return Math.max(score, Math.min(actualScore, 1));
	}
}



module.exports = board;
