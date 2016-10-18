const chalk = require('chalk');
const blue = chalk.blue;	
const expect = require('chai').expect;
const utils = require('../javascript/utils.js');

// console.log(blue(board))

describe('transpose', function () {
	it('it turns rows into cols', function () {
		var board = [[0,4,0,0],
					 [2,0,0,0],
					 [0,0,0,0],
					 [0,0,0,0]];

		expect(board[0][1]).to.equal(4);
		var transposed = utils.transpose(board);
		expect(transposed[0][1]).to.equal(2);
	});
});

describe('getAverageDiffSansZeros', function () {
	it('gets averageDiff with no zeros', function () {
		expect(utils.getAverageDiffSansZeros([1,2,3])).to.equal(2);
	});
	it('it ignores zeros when they are there', function () {
		expect(utils.getAverageDiffSansZeros([1,2,3, 0, 0])).to.equal(2);
	});
	it('it ignores undefined when they are there', function () {
		expect(utils.getAverageDiffSansZeros([1,2,3, 0, undefined])).to.equal(2);
	});
	it('return zero is all undefined when they are there', function () {
		expect(utils.getAverageDiffSansZeros([0,0,0, 0, undefined])).to.equal(0);
	});
	// it('it rounds', function () {
	// });
});

