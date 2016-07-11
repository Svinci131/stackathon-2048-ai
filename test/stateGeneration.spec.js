// var chalk = require('chalk');
// var spies = require('chai-spies');
// var blue = chalk.blue;	
// var chai = require('chai');
// var expect = require('chai').expect;
// var stateGen = require('../javascript/ai/stateGeneration');
// var Board = require('../javascript/board.js');
// var board = new Board();
// var Node = require('../javascript/ai/node');
// var node = new Node (board);

// describe("createDelibrateState", function (){
// 	var testBoard = [[0,0,0,0],
// 				   [0,4,0,0],
// 				   [0,0,0,0],
// 				  [0,0,0,0]];
// 	board.board = testBoard;
// 	it ("creates an instance of node", function (){
// 		var possibleDelibrateState = stateGen.createDelibrateState(node.boardObj.board, "horizontal", "right");
// 		expect(possibleDelibrateState).to.be.an.instanceof(Node);
// 	});
// });


// describe("createAllPossibleDelibrateStates", function (){
// 	var testBoard = [[0,0,0,0],
// 				   [0,4,0,0],
// 				   [0,0,0,0],
// 				  [0,0,0,0]];
// 	board.board = testBoard;
// 	var possibleStates = stateGen.createAllPossibleDelibrateStates(node);
// 	it ("it creates four new node", function() {
// 		expect(possibleStates.length).to.equal(4);
// 		expect(possibleStates[0]).to.be.an.instanceof(Node);
// 	});
// 	it("the first is a board swiped right", function(){
// 		expect(possibleStates[0].boardObj.board[1][3]).to.equal(4);
// 	});
// 	it("does not affect the parent node", function(){
// 		expect(node.boardObj.board).to.not.eql(possibleStates[0].boardObj.board);
// 	});
// 	it("tobediff", function(){
// 		expect(possibleStates[1].boardObj.board).to.not.eql(possibleStates[0].boardObj.board);
// 	});
// 	it ("works in alphabeta", function () {
// 		var brokenOne = new Board();
// 		brokenOne.board =  [ [ 4, 16, 8, 2 ],
// 				     [ 2, 8, 2, 4 ],
// 				     [ 0, 4, 32, 8 ],
// 				     [ 0, 4, 8, 4 ] ]
// 		var testnode = new Node (brokenOne);
// 		var possibleStates = stateGen.createAllPossibleDelibrateStates(testnode);
// 		// console.log("here+++++++++++++++++++")
// 		// console.log(possibleStates)
// 		// console.log("here+++++++++++++++++++")
// 	})
// });

// describe("createRandomState", function (){
// 	//024
// 	beforeEach(function(){
// 			const testBoard = [[0,0,0,0],
// 				   [0,4,0,0],
// 				   [0,0,0,0],
// 				  [0,0,0,0]];
// 		board.board = testBoard;
// 	});

// 	var possibleState = stateGen.createRandomState(node.boardObj.board, 0, 2, 4);
// 	it('returns a new node', function(){
// 		//var possibleState = stateGen.createRandomState(node.boardObj.board, 0, 2, 4);
// 		expect(possibleState).to.be.an.instanceof(Node);
// 	});
// 	it ("it adds val to col in row", function() {
// 		// console.log(possibleState)
// 		//var possibleState = stateGen.createRandomState(node.boardObj.board, 0, 2, 4);
// 		expect(possibleState.boardObj.board[0][2]).to.equal(4);
// 	});
// 	it("does not affect the parent node", function(){
// 		// console.log(node.boardObj.board);
// 		expect(node.boardObj.board).to.not.eql(possibleState.boardObj.board);

// 	});
// });
// describe("createAllPossibleRandomStates", function (){
// 	var board01 = new Board();
// 	var node01 = new Node (board01);
// 	var possibleStates = stateGen.createAllPossibleRandomStates(node01);
// 	it("does not affect the parent node", function(){
// 		//console.log(node01.boardObj.board);
// 		expect(node01.boardObj.board).to.not.eql(possibleStates[0].boardObj.board);
// 	});
// 	it("gets create a new node with two and four for everypossible empty space", function() {
// 		//console.log("HERE", possibleStates);
// 		expect(possibleStates.length).to.equal(32);
// 	});
// 	it ("works", function() {
// 		var board02 = new Board();
// 		board02.board = [ [ 0, 16, 8, 2 ],
// 					    [ 2, 8, 2, 4 ],
// 					    [ 0, 4, 32, 8 ],
// 					    [ 0, 4, 8, 4 ] ]
// 		var node02 = new Node (board02);
// 		var possibleStates = stateGen.createAllPossibleRandomStates(node02);
// 		var emptySpaces = board02.getEmptySpots().length;
// 		console.log(possibleStates.length)
// 		expect(possibleStates.length).to.equal(emptySpaces*2);
// 	});
// 	it ("creates a normal board", function() {
// 		var board02 = new Board();
// 		board02.board = [ [ 0, 16, 8, 2 ],
// 					    [ 2, 8, 2, 4 ],
// 					    [ 0, 4, 32, 8 ],
// 					    [ 0, 4, 8, 4 ] ]
// 		var node02 = new Node (board02);
// 		var possibleStates = stateGen.createAllPossibleRandomStates(node02);
// 		var emptySpaces = board02.getEmptySpots().length;
// 		console.log(possibleStates[0])
// 		expect(possibleStates[0].boardObj.board.length).to.equal(4);
// 	});
// });
