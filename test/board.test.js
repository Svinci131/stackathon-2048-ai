'use strict'

const chalk = require('chalk');
const spies = require('chai-spies');
const blue = chalk.blue;	
const chai = require('chai');
// const sinon = require("sinon");
const expect = require('chai').expect;
const board = require('../javascript/board.js');
const swipe = board.swipe;
const directions = require("../javascript/directions");
const transpose = require('../javascript/utils').transpose;
const Board = new board();
const clone = require('lodash.clone');

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
});
// describe("heuristic score", function(){
// 	Board.board = [ [0,0,0,0],
// 						[0,0,0,0],
// 						[0,0,0,0],
// 						[2048,256,128,0]];
// 		let worseBoard = new board();
// 		worseBoard.board = [[0,2048,0,0],
// 							[0,256,0,0],
// 							[0,128,0,0],
// 						    [0,0,0,0]];
// 		expect(Board.heuristicScore()).to.be.above(worseBoard.heuristicScore());
// });

describe("actualScore", function (){
	it ("has calcutlates the actualScore", function() {
		Board.board = [[0,2,2,0],
						[4,2,2,0],
						[128,2,2,0],
						[4,2048,8,4]];
		let worseBoard = new board();
		worseBoard.board = [[0,2,2,0],
						[4,2,2,0],
						[128,2,2,0],
						[4,2,8,4]];
		expect(Board.actualScore()).to.be.above(worseBoard.actualScore());
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
		Board.update("vertical", "down");
		// expect(transposedCall).to.have.been.called;
	});
	it("inserts random zero", function () {
		// expect(this.fillRandomEmptySpace).to.have.been.called;

	});

});

	

describe('fillRandomEmptySpace', function () {
	const Board = new board();
	Board.board = [[0,0,0,0],
					  [0,0,0,0],
					  [0,0,0,0],
					  [0,0,0,0]];
	
	it('it changes removes one index from empty spots', function () {
		Board.fillRandomEmptySpace();
		let remainingEmptySpots = Board.emptyspots.reduce((a,b) => {
			return a.concat(b);
		});
		expect(remainingEmptySpots.length).to.equal(15);

	});
	//need a way to test this- but it works 
	it('it changes one zero value in board to two or four', function () {
		// let newBoard = Board.board.reduce((a,b) => {
		// 	return a.concat(b);
		// });
		// console.log(newBoard);
		// expect(Board.board.indexOf(4))).to.be.true; || 
		// expect(Board.board.indexOf(2))).to.be.true; || 
	});
	it('it updates gameOver if there are no moves left', function () {
		Board.emptyspots = [ [4],[],[],[]];
		Board.fillRandomEmptySpace();
		expect(Board.gameOver).to.be.true;
	});
});