'use strict'


const chalk = require('chalk');
const blue = chalk.blue;	
const expect = require('chai').expect;
const game = require('../javascript/main.js');
// console.log(blue(board))

describe('transpose', function () {
	it('it turns rows into cols', function () {
		var board = [[0,4,0,0],
					 [2,0,0,0],
					 [0,0,0,0],
					 [0,0,0,0]];

		expect(board[0][1]).to.equal(4);
		var transposed = game.transpose(board);
		expect(transposed[0][1]).to.equal(2);
	});
});

describe('swipeRight', function () {
	it('moves all zeros to the left', function() {
		expect(game.swipeRight([0,2,2,0])).to.eql([ 0, 0, 0, 4 ]);
	});
	it('merges consequetive equal nums', function() {
		expect(game.swipeRight([4,2,2,0])).to.eql([ 0, 0, 4, 4 ]);
		expect(game.swipeRight([128,2,2,0])).to.eql([ 0, 0, 128, 4 ]);
	});
	it('it doesnt change ones w no zeros or consequetive mathces', function(){
		expect(game.swipeRight([4,2,8,4])).to.eql([4,2,8,4]);
	});
});

describe('swipeLeft', function () {
	it('moves all zeros to the left', function() {
		expect(game.swipeLeft([0,2,2,0])).to.eql([4, 0, 0, 0 ]);
	});
	it('merges consequetive equal nums', function() {
		expect(game.swipeLeft([4,2,2,0])).to.eql([ 4, 4, 0, 0, ]);
		expect(game.swipeLeft([128,2,2,0])).to.eql([  128, 4, 0, 0 ]);
	});
	it('it doesnt change ones w no zeros or consequetive mathces', function(){
		expect(game.swipeLeft([4,2,8,4])).to.eql([4,2,8,4]);
		expect(game.swipeLeft([128,64,16,8])).to.eql([128,64,16,8]);
	});
});

describe('swipeUp', function () {
	var board = [[0,4,0,0],
				 [2,0,0,0],
				 [2,0,0,0],
				 [0,4,0,0]];

	var transposed = game.transpose(board);
	//[ [ 0, 2, 2, 0 ], [ 4, 0, 0, 4 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ]

	//console.log(game.swipe("up", board)[0][0]).to.be(4);
	//console.log(game.swipe("up", board)[0][1]).to.be(8);
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