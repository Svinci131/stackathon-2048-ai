'use strict'

const chalk = require('chalk');
const blue = chalk.blue;	
const expect = require('chai').expect;
const swipe = require('../javascript/swipe.js');

describe('swipeRight', function () {
	it('moves all zeros to the left', function() {
		expect(swipe.swipeRight([0,2,2,0])).to.eql([ 0, 0, 0, 4 ]);
	});
	it('merges consequetive equal nums', function() {
		expect(swipe.swipeRight([4,2,2,0])).to.eql([ 0, 0, 4, 4 ]);
		expect(swipe.swipeRight([128,2,2,0])).to.eql([ 0, 0, 128, 4 ]);
	});
	it('it doesnt change ones w no zeros or consequetive mathces', function(){
		expect(swipe.swipeRight([4,2,8,4])).to.eql([4,2,8,4]);
	});
});

describe('swipeLeft', function () {
	it('moves all zeros to the left', function() {
		expect(swipe.swipeLeft([0,2,2,0])).to.eql([4, 0, 0, 0 ]);
	});
	it('merges consequetive equal nums', function() {
		expect(swipe.swipeLeft([4,2,2,0])).to.eql([ 4, 4, 0, 0, ]);
		expect(swipe.swipeLeft([128,2,2,0])).to.eql([  128, 4, 0, 0 ]);
	});
	it('it doesnt change ones w no zeros or consequetive mathces', function(){
		expect(swipe.swipeLeft([4,2,8,4])).to.eql([4,2,8,4]);
		expect(swipe.swipeLeft([128,64,16,8])).to.eql([128,64,16,8]);
	});
});


// describe('swipeUp', function () {
// 	var board = [[0,4,0,0],
// 				 [2,0,0,0],
// 				 [2,0,0,0],
// 				 [0,4,0,0]];

// 	var transposed = game.transpose(board);
// 	//[ [ 0, 2, 2, 0 ], [ 4, 0, 0, 4 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ]

// 	//console.log(game.swipe("up", board)[0][0]).to.be(4);
// 	//console.log(game.swipe("up", board)[0][1]).to.be(8);
// });

