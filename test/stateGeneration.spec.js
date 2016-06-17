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
		var possibleDelibrateState = stateGen.createDelibrateState(node.boardObj, "horizontal", "right");
		expect(possibleDelibrateState).to.be.an.instanceof(Node);
		expect(possibleDelibrateState.boardObj.board[0][3]).to.equal(4);
	});
});


describe("createAllPossibleDelibrateStates", function (){
	var possibleStates = stateGen.createAllPossibleDelibrateStates(node);
	it ("it creates four new node", function() {
		expect(possibleStates.length).to.equal(4);
		expect(possibleStates[0]).to.be.an.instanceof(Node);
	});
});

describe("createRandomState", function (){
	//024
	it('returns a new node', function(){
		var possibleState = stateGen.createRandomState(node.boardObj, 0, 2, 4);
		expect(possibleState).to.be.an.instanceof(Node);
	});
	it ("it adds val to col in row", function() {
		var possibleState = stateGen.createRandomState(node.boardObj, 0, 2, 4);
		expect(possibleState.boardObj.board[0][2]).to.equal(4);
	});
});
describe("createAllPossibleRandomStates", function (){
	it("gets create a new node with two and four for everypossible empty space", function() {
		
	});
});
