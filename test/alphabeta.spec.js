var chalk = require('chalk');
var blue = chalk.blue;	
var expect = require('chai').expect;

var Board = require('../javascript/board.js');
var Tree = require('../javascript/ai/tree');


describe("tree", function (argument) {
	
	it("doesn't loop indefinately", function() {
		var board = new Board ();
		board.board =	
		[ [ 2, 4, 8, 2 ],
		  [ 4, 2, 4, 16 ],
		  [ 2, 4, 8, 2 ],
		  [ 4, 8, 2, 4 ] ];

	  	console.log("BEFORE", board.board);
		var aiGame = new Tree(board);
		var game = aiGame.head.boardObj;
		var bestMove = aiGame.alphaBeta(aiGame.head, 5, -Infinity, Infinity, true);
		var orientation = bestMove.boardObj.lastOrientation;
		var direction = bestMove.boardObj.lastDirection;
		console.log('============');
		console.log('DIRECTION', direction);
		console.log('orientation', orientation);
		console.log('============');
		console.log("BEST MOVE", bestMove.boardObj.board);
		game.update(orientation, direction);
		console.log('============');
		console.log('AFTER', game);
	});
});

		// [ [ 4, 2, 4, 32 ],
	 //      [ 2, 4, 16, 32 ],
	 //      [ 2, 8, 16, 4 ],
	 //      [ 2, 4, 2, 16 ] ]

// [ [ 4, 2, 4, 2 ],
//   [ 16, 2, 4, 2 ],
//   [ 16, 8, 4, 2 ],
//   [ 4, 8, 2, 4 ] ]
	     /*
	     [	[4, 2, 4, 64]
	     	[4, 4, 32, 4]
	     	[2, 8, 2, 16]
			[0, 4, 0,  0]
	     ]
		 [	[ 0, 2, 0,  0 ]
			[ 4, 4, 4, 64 ]
			[ 2, 8, 32, 4 ]
			[ 4, 4, 2, 16 ]
		 ]
	     */
		////
		 // [ [ 2, 4, 8, 2 ],
	  //      [ 4, 8, 4, 16 ],
	  //      [ 4, 16, 32, 2 ],
	  //      [ 8, 4, 2, 8 ] ];
