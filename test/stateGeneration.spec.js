const chalk = require('chalk');
const spies = require('chai-spies');
const blue = chalk.blue;	
const chai = require('chai');
const sinon = require("sinon");
const expect = require('chai').expect;
const stateGen = require('../javascript/ai/stateGeneration');
const board = require('../javascript/board.js');
const Board = new board();

// describe("createAllPossibleDelibrateStates", function (){
// 	it ("it ", function() {
// 		// aiPlay.start();
// 	});
// });