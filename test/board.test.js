'use strict'

var chalk = require('chalk');
var spies = require('chai-spies');
var blue = chalk.blue;	
var chai = require('chai');
// const sinon = require("sinon");
var expect = require('chai').expect;
var board = require('../javascript/board.js');
const swipe = board.swipe;
var directions = require("../javascript/directions");
var transpose = require('../javascript/utils').transpose;
var Board = new board();
var clone = require('lodash.clone');

// console.log(blue(board))
describe("board", function (){
	it ("has four arrays of four", function() {
		expect(Board.board.length).to.equal(4);
	});
});

describe("hasLost", function(){
	it ("doesn't alter board", function() {
		var testBoard = new board();
		var originalBoard = clone(testBoard);
		testBoard.hasLost();
		expect(testBoard.board).to.eql(originalBoard.board);
	});
	it ("fires if there are no next moves", function() {
		var testBoard = new board();
		testBoard.board = [ [4,2,4,2],
						    [2,4,2,4],
						    [4,2,4,2],
						    [2,4,2,4]];
		testBoard.hasLost();
		expect(testBoard.gameOver).to.be.true;
	});
	it ("doesn't firee if there are", function() {
		var testBoard = new board();
		testBoard.board = [ [4,2,4,2],
						    [4,4,2,4],
						    [4,2,4,2],
						    [2,4,2,4]];
		testBoard.hasLost();
		// console.log("gameOver", testBoard.gameOver);
		expect(testBoard.gameOver).to.be.false;
	});
	it ("works in this situation", function () {
		var testBoard = new board();
		testBoard.board = [ [ 4, 8, 4, 2 ],
					  		[ 16, 4, 2, 4 ],
					  		[ 8, 2, 16, 2 ],
					  		[ 4, 8, 16, 32 ] ];
		testBoard.hasLost();
		expect(testBoard.gameOver).to.be.false;
	});
	it("works here too", function() {
		var Board2 = new board();
		Board2.board =[ [ 4, 16, 4,  4 ],
					    [ 2, 4,  4,  4 ],
						[ 4, 2,  64, 4 ],
						[ 2, 4,  8,  32 ] ];
		Board2.hasLost();
		expect(Board2.gameOver).to.be.false;
	});
});

describe("heuristic score", function(){
	it ("gets a normalized over all score", function() {
	Board.board = [ [0,0,0,0],
						[0,0,0,0],
						[0,0,0,0],
						[2048,256,128,0]];
		let worseBoard = new board();
		worseBoard.board = [[0,2048,0,0],
							[0,256,0,0],
							[0,128,0,0],
						    [0,0,0,0]];
		expect(Board.heuristicScore()).to.be.above(worseBoard.heuristicScore());
	});
});
describe("actual score", function (){
	it ("sums all tiles", function() {
		Board.board = [[0,0,0,0],
						[4,2,2,0],//8
						[128,2,2,0],//132
						[4,4,8,4]];//20

		expect(Board.actualScore()).to.equal(160);
	});
});

describe("highestTile", function (){
	it ("has gets the highest tile", function() {
		Board.board = [[0,2,2,0],
						[4,2,2,0],
						[128,2,2,0],
						[4,2048,8,4]];
		let worseBoard = new board();
		worseBoard.board = [[0,2,2,0],
						[4,2,2,0],
						[128,2,2,0],
						[4,2,8,4]];
		expect(Board.highestTile()).to.be.above(worseBoard.highestTile());
	});
});

describe("clusteringScore", function (){
	it ("has gets lower score when the high tiles are close to eachother ", function() {
		Board.board = [[0,2,2,0],
						[4,2,2,0],
						[2048,256,128,0],
						[0,2,8,4]];
		let worseBoard = new board();
		worseBoard.board = [[0,2,2,2048],
						[4,2,2,0],
						[128,2,2,0],
						[4,2048,8,4]];
		// console.log(Board.actualScore(), Board.clusteredScore())
		// console.log(worseBoard.actualScore(), worseBoard.clusteredScore())
		expect(Board.clusteredScore()).to.be.below(worseBoard.clusteredScore());
	});
	it ("works in a bunch of situations", function () {
			Board.board = [[0,2,2,0],
						[4,2,2,0],
						[128,2,2,0],
						[4,2048,2048,256]];
		let worseBoard = new board();
		worseBoard.board = [[2,0,456,0],
						[0,2,128,2048],
						[2048,0,0,0],
						[0,128,0,128]];
		expect(Board.clusteredScore()).to.be.below(worseBoard.clusteredScore());
	});
	it ("shouldn't get 0 unless all zeros", function () {
		let Board06 = new board();
		Board06.board = [ [ 0, 0, 0, 0 ],
		  				[ 0, 0, 0, 2 ], 
		  				[ 0, 0, 0, 4 ], 
		  				[ 0, 0, 4, 4 ] ]
		// console.log(Board06.clusteredScore());
		expect(Board.clusteredScore()).to.not.equal(0);

	})
	it ("has gets lower score when the high tiles are on sides or corners ", function() {
		Board.board = [ [0,0,0,0],
						[0,0,0,0],
						[0,0,0,0],
						[2048,256,128,0]];
		let worseBoard = new board();
		worseBoard.board = [[0,2048,0,0],
							[0,256,0,0],
							[0,128,0,0],
						    [0,0,0,0]];

		expect(Board.clusteredScore()).to.be.below(worseBoard.clusteredScore());
	});
});

describe("swipe", function () {
	beforeEach(function() {		
		Board.board = [[0,2,2,0],
						[4,2,2,0],
						[128,2,2,0],
						[4,2,8,4]];
	});

	it ("swipes left and updates board", function() {
		Board.swipe(directions["horizontal"]["left"]);
		let expectedBoard = [[4,0,0,0],
							[4,4,0,0],
							[128,4,0,0],
							[4,2,8,4]];
		expect(Board.board).to.eql(expectedBoard);			
	});
	it ("swipes right and updates board", function () {
		Board.swipe(directions["horizontal"]["right"]);
		let expectedBoard = [[0,0,0,4],
							[0,0,4,4],
							[0,0,128,4],
							[4,2,8,4]];
		expect(Board.board).to.eql(expectedBoard);	
	});
	
	describe("swipe new orientation", function() {
		//idk why this doesnt work
		beforeEach(function() {		
			Board.board = transpose(Board.board);
		})

		it ("it transposes and swipesright when you swipe up ", function () {

			Board.swipe(directions["vertical"]["up"]);

			let transposedBack = 
			[ [ 4, 4, 4, 4 ],
			  [ 128, 4, 2, 0 ],
			  [ 4, 0, 8, 0 ],
			  [ 0, 0, 0, 0 ] ];

			let expected = transposedBack;
			expect(transpose(Board.board)).to.eql(expected);	
		})
		
		it ("transposes and swipesleft when you swipe up ", function () {
			Board.swipe(directions["vertical"]["down"]);
			let transposedBack = 
			[ [ 0, 0, 0, 0 ],
			  [ 4, 0, 2, 0 ],
			  [ 128, 4, 4, 0 ],
			  [ 4, 4, 8, 4 ] ];
			let expected = transposedBack;
			expect(transpose(Board.board)).to.eql(expected);
		});
	});
});

describe("update", function () {
	const Board = new board();
	// const transposedCall = sinon.spy(transpose)

	beforeEach(function() {		
		Board.board = [[0,2,2,0],
						[4,2,2,0],
						[128,2,2,0],
						[4,2,8,4]];
		Board.lastOrientation = "horizontal";
	})

	//just to make it easier to see never used
	const vTransposed =
		[ [ 0, 4, 128, 4 ],
		  [ 2, 2, 2, 2 ],
		  [ 2, 2, 2, 8 ],
		  [ 0, 0, 0, 4 ] ];

	it("updates last orientation", function () {
		Board.update("vertical", "down");
		expect(Board.lastOrientation).to.equal("vertical");
	});
	it ("takes an orientation and transposes board if it's diff from last", function() {
		var downBoard = new board();
		downBoard.board = [ [ 2, 4, 8, 2 ],
							  [ 4, 2, 8, 4 ],
							  [ 2, 4, 16, 4 ],
							  [ 2, 8, 16, 4 ] ];
  	downBoard.update("vertical", "down");
  	// console.log("down", downBoard);
	//expect(downBoard).to.have.been.called;
	});

});

	

describe('fillRandomEmptySpace', function () {
	const Board = new board();
	Board.board = [[0,0,0,0],
					  [0,0,0,0],
					  [0,0,0,0],
					  [0,0,0,0]];
});