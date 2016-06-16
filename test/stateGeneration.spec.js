const chalk = require('chalk');
const spies = require('chai-spies');
const blue = chalk.blue;	
const chai = require('chai');
const sinon = require("sinon");
const expect = require('chai').expect;
const stateGen = require('../javascript/ai/stateGeneration');
const Board = require('../javascript/board.js');
const board = new Board();
const Node = require('../javascript/ai/node');
const testBoard = [[0,4,0,0],
				 [2,0,0,0],
				 [0,0,0,0],
				 [0,4,0,0]];
board.board = testBoard;
const node = new Node (board);

describe("createDelibrateState", function (){
	
	it ("creates an instance of node", function (){
		var possibleDelibrateState = stateGen.createDelibrateState(board, "horizontal", "right");
		expect(possibleDelibrateState).to.be.an.instanceof(Node);
		expect(possibleDelibrateState.boardObj.board[0][3]).to.equal(4);
	});
	// it ("it creates four states", function() {
	// 	expect(st)
	// });
});


describe("createAllPossibleDelibrateStates", function (){
	// createAllPossibleDelibrateStates(board) 
	// it ("it creates four states", function() {
	// 	expect()
	// });
});

describe("createAllRandomDelibrateStates", function (){

});