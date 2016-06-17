'use strict' 

const directions = require("./directions");
const utils = require("./utils");
const transpose = utils.transpose;
const twoOrFour = utils.twoOrFour;
const getFlatArr = utils.getFlatArr;
const absoluteDiff = utils.absoluteDiff;

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
		if(emptySpots.length > 0) {
			var random = Math.floor(Math.random() * emptySpots.length);
			var cell = emptySpots[random];
			this.board[cell[0]][cell[1]] = twoOrFour();
		} 
		else {
			this.gameOver = true;
		}
	}
	//(string, string) //o(n*n + n*n)if we transpose //else o(n*n)
	update (orientation, direction) { 
		//if direction is diff transpose
		this.lastDirection = direction;
		if (orientation !== this.lastOrientation) {
			this.board = transpose(this.board);
		}
		let swipeFunc = directions[orientation][direction];//define direction to swipe in 
		this.swipe(swipeFunc);//swipe
		this.lastOrientation = orientation;//reset orientation to avoid having transpose as often 
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
		return Math.max.apply( Math, all );
	};
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
		let actualScore = this.actualScore();
		let clusteredScore = this.clusteredScore();
		let numberOfEmptyCells = this.getEmptySpots().length;//o(n)
		let score = (actualScore+Math.log(actualScore)*numberOfEmptyCells - clusteredScore);
		return Math.max(score, Math.min(actualScore, 1));
	}
}



module.exports = board;
