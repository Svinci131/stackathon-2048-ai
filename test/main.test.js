'use strict'

const chalk = require('chalk');
const spies = require('chai-spies');
const blue = chalk.blue;	
const chai = require('chai');
const sinon = require("sinon");
const expect = require('chai').expect;
const board = require('../javascript/main.js');
const swipe = board.swipe;
const directions = require("../javascript/directions")
const transpose = require('../javascript/utils').transpose
// console.log(blue(board))

describe("swipe", function () {
	const Board = new board();

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

	

// describe('fillRandomEmptySpace', function () {
// 	it('it changes one zero value in board to two or four', function () {
// 		let board = [[0,0,0,0],
// 					 [0,0,0,0],
// 					 [0,0,0,0],
// 					 [0,0,0,0]];

// 		board = game.fillRandomEmptySpace(board);
// 		board = board.reduce((a,b) => {
// 			return a.concat(b);
// 		});
// 		expect(board.match(/0/gi).length).to.equal(15);

// 	});
// });