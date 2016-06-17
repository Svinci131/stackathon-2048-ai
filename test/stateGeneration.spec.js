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
const node = new Node (board);

describe("createDelibrateState", function (){
	var testBoard = [[0,0,0,0],
				   [0,4,0,0],
				   [0,0,0,0],
				  [0,0,0,0]];
	board.board = testBoard;
	it ("creates an instance of node", function (){
		var possibleDelibrateState = stateGen.createDelibrateState(node.boardObj.board, "horizontal", "right");
		expect(possibleDelibrateState).to.be.an.instanceof(Node);
	});
});


describe("createAllPossibleDelibrateStates", function (){
	var testBoard = [[0,0,0,0],
				   [0,4,0,0],
				   [0,0,0,0],
				  [0,0,0,0]];
	board.board = testBoard;
	var possibleStates = stateGen.createAllPossibleDelibrateStates(node);
	it ("it creates four new node", function() {
		expect(possibleStates.length).to.equal(4);
		expect(possibleStates[0]).to.be.an.instanceof(Node);
	});
	it("the first is a board swiped right", function(){
		expect(possibleStates[0].boardObj.board[1][3]).to.equal(4);
	});
	it("does not affect the parent node", function(){
		expect(node.boardObj.board).to.not.eql(possibleStates[0].boardObj.board);
	});
	it("tobediff", function(){
		expect(possibleStates[1].boardObj.board).to.not.eql(possibleStates[0].boardObj.board);
	});
});

describe("createRandomState", function (){
	//024
	beforeEach(function(){
			const testBoard = [[0,0,0,0],
				   [0,4,0,0],
				   [0,0,0,0],
				  [0,0,0,0]];
		board.board = testBoard;
	});

	var possibleState = stateGen.createRandomState(node.boardObj.board, 0, 2, 4);
	it('returns a new node', function(){
		//var possibleState = stateGen.createRandomState(node.boardObj.board, 0, 2, 4);
		expect(possibleState).to.be.an.instanceof(Node);
	});
	it ("it adds val to col in row", function() {
		console.log(possibleState)
		//var possibleState = stateGen.createRandomState(node.boardObj.board, 0, 2, 4);
		expect(possibleState.boardObj.board[0][2]).to.equal(4);
	});
	it("does not affect the parent node", function(){
		console.log(node.boardObj.board);
		expect(node.boardObj.board).to.not.eql(possibleState.boardObj.board);

	});
});
describe("createAllPossibleRandomStates", function (){
	var possibleStates = stateGen.createAllPossibleRandomStates(node);

	it("does not affect the parent node", function(){
		console.log(node.boardObj.board);
		expect(node.boardObj.board).to.not.eql(possibleStates[0].boardObj.board);
	});
	// it("gets create a new node with two and four for everypossible empty space", function() {
		
	// });
});
