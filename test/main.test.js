'use strict'

const chalk = require('chalk');
const blue = chalk.blue;	
const expect = require('chai').expect;
const board = require('../javascript/main.js');
const swipe = board.swipe;
const transpose = require('../javascript/utils').transpose
// console.log(blue(board))

describe("swipe", function () {
	const Board = new board();
	//just to make it easier to see never used
	const vTransposed =
		[ [ 0, 4, 128, 4 ],
		  [ 2, 2, 2, 2 ],
		  [ 2, 2, 2, 8 ],
		  [ 0, 0, 0, 4 ] ]

	beforeEach(function() {		
		Board.board = [[0,2,2,0],
						[4,2,2,0],
						[128,2,2,0],
						[4,2,8,4]];
		Board.lastOrientation = "horizontal";
	});
	it("updates last orientation", function () {
		Board.swipe("vertical", "down");
		expect(Board.lastOrientation).to.equal("vertical");
	});
	it ("swipes left and updates board", function() {
		Board.swipe("horizontal", "left");
		let expectedBoard = [[4,0,0,0],
							[4,4,0,0],
							[128,4,0,0],
							[4,2,8,4]];
		expect(Board.board).to.eql(expectedBoard);			
	});
	
	it ("it transposes and swipesright when you swipe up ", function () {
		Board.swipe("vertical", "up");
		let transposedBack = 
		[ [ 4, 4, 4, 4 ],
		  [ 128, 4, 2, 0 ],
		  [ 4, 0, 8, 0 ],
		  [ 0, 0, 0, 0 ] ]
		let expected = transposedBack;
		expect(transpose(Board.board)).to.eql(expected);	
	});
	it ("swipes right and updates board", function () {
		Board.swipe("horizontal", "right");
		let expectedBoard = [[0,0,0,4],
							[0,0,4,4],
							[0,0,128,4],
							[4,2,8,4]];
		expect(Board.board).to.eql(expectedBoard);	
	});
	it ("it transposes and swipesleft when you swipe up ", function () {
		Board.swipe("vertical", "down");
		let transposedBack = 
		[ [ 0, 0, 0, 0 ],
		  [ 4, 0, 2, 0 ],
		  [ 128, 4, 4, 0 ],
		  [ 4, 4, 8, 4 ] ];
		let expected = transposedBack;
		expect(transpose(Board.board)).to.eql(expected);
	});

});

//	it ("if you pass in the same direction twice it doens't transpose", function() {
		//we start left so this is tested
	// });

	// it("updates last direction", function () {

	// });
	// it("inserts random zero", function () {

	// });

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