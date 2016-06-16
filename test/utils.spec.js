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

