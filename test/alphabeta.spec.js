var chalk = require('chalk');
var blue = chalk.blue;	
var expect = require('chai').expect;

var Board = require('../javascript/board.js');
var Tree = require('../javascript/ai/tree');
var utils = require('../javascript/utils.js');


// [ [ 2, 4, 16, 8 ],
//   [ 8, 16, 4, 2 ],
//   [ 4, 2, 8, 2 ],
//   [ 8, 32, 2, 4 ] ]
describe("tree", function (argument) {
	//losing boards
	it("doesn't loop indefinately", function() {
		var board = new Board ();
		board.board =	
		  [ [ 16, 2, 4, 2 ],
			  [ 4, 8, 16, 2 ],
			  [ 4, 2, 16, 8 ],
			  [ 2, 4, 8, 4 ] ]
		  //[ [ 2, 4, 16, 8 ],
		   // [ 8, 16, 4, 4 ],
		   // [ 4, 2, 8, 4 ],
		   // [ 8, 32, 2, 0 ] ]

	  	console.log("BEFORE", board.board);
		var aiGame = new Tree(board);
		var game = aiGame.head.boardObj;
		var bestMove = aiGame.alphaBeta(aiGame.head, 3, -Infinity, Infinity, true);
		var orientation = bestMove.boardObj.lastOrientation;
		var direction = bestMove.boardObj.lastDirection;
		game.update(orientation, direction);
		expect(bestMove.boardObj.board).to.equal(game.board);
		console.log('============');
		console.log('DIRECTION', direction);
		console.log('orientation', orientation);
		console.log('============');
		console.log("BEST MOVE", bestMove.boardObj.board);
		// game.update(orientation, direction);
		console.log('============');
		console.log('AFTER', utils.transpose(game.board), game.board);
	});
});
//start
 // [ [ 16, 2, 4, 2 ],
 //  [ 4,   8, 16, 2 ],
 //  [ 4,   2, 16, 8 ],
 //  [ 2,   4, 8, 4 ] ]
//down 
 // [ [ 0, 2, 0, 0 ],
 //  [ 16, 8, 4, 4 ],
 //  [ 8, 2, 32, 8 ],
 //  [ 2, 4, 8, 4 ] ]
//up
 //  [ 16, 2, 4,  4 ],
 //  [ 8,  8, 32, 8 ],
 //  [ 2,  2, 8,  4],
 //  [ 0,  4, 0,  0 ] ]

//3
//kids //up and down 
//down [ [ 0, 16, 8, 2 ],
    // [ 2, 8, 2, 4 ],
    // [ 0, 4, 32, 8 ],
    // [ 0, 4, 8, 4 ] ]

//up [ 16, 8,  2, 0 ],
  // [ 2,  8,  2, 4 ],
  // [ 4,  32, 8, 0 ],
  // [ 4,  8,  4, 0 ] ]


//2
//DOWN
// down 565 [ [ 2, 16, 8, 2 ],
		//    [ 2, 8, 2, 4 ],
		//   [ 0, 4, 32, 8 ],
		//   [ 0, 4, 8, 4 ] ]

	//1
	//left should be 
	 // [ [ 4, 0, 0, 0 ],
  //    [ 16, 8, 8, 0 ],
  //    [ 8, 2, 32, 8 ],
  //    [ 2, 4, 8, 4 ] ],





  //down - not an option

// 878
// down 567 [ [ 4, 16, 8,  2 ],
		//    [ 2, 8,  2,  4 ],
		//    [ 0, 4,  32, 8 ],
		//    [ 0, 4,  8,  4 ] ]


// 878
// down 565 [ [ 0, 16, 8, 2 ],
//   [ 2, 8, 2, 4 ],
//   [ 2, 4, 32, 8 ],
//   [ 0, 4, 8, 4 ] ]
// 878
// down 567 [ [ 0, 16, 8, 2 ],
//   [ 2, 8, 2, 4 ],
//   [ 4, 4, 32, 8 ],
//   [ 0, 4, 8, 4 ] ]
// 878
// down 562 [ [ 0, 16, 8, 2 ],
//   [ 2, 8, 2, 4 ],
//   [ 0, 4, 32, 8 ],
//   [ 2, 4, 8, 4 ] ]
// 878
// down 562 [ [ 0, 16, 8, 2 ],
//   [ 2, 8, 2, 4 ],
//   [ 0, 4, 32, 8 ],
//   [ 4, 4, 8, 4 ] ]

//UP
// up 541 [ [ 16, 8, 2, 2 ],
//   [ 2, 8, 2, 4 ],
//   [ 4, 32, 8, 0 ],
//   [ 4, 8, 4, 0 ] ]
// 849
// up 533 [ [ 16, 8, 2, 4 ],
//   [ 2, 8, 2, 4 ],
//   [ 4, 32, 8, 0 ],
//   [ 4, 8, 4, 0 ] ]
// 849
// up 529 [ [ 16, 8, 2, 0 ],
//   [ 2, 8, 2, 4 ],
//   [ 4, 32, 8, 2 ],
//   [ 4, 8, 4, 0 ] ]
// 849
// up 525 [ [ 16, 8, 2, 0 ],
//   [ 2, 8, 2, 4 ],
//   [ 4, 32, 8, 4 ],
//   [ 4, 8, 4, 0 ] ]
// 849
// up 530 [ [ 16, 8, 2, 0 ],
//   [ 2, 8, 2, 4 ],
//   [ 4, 32, 8, 0 ],
//   [ 4, 8, 4, 2 ] ]
// 849
// up 525 [ [ 16, 8, 2, 0 ],
//   [ 2, 8, 2, 4 ],
//   [ 4, 32, 8, 0 ],
//   [ 4, 8, 4, 4 ] ]

//////////////


// A
// [ [ 0, 0, 0, 2 ],
//   [ 0, 0, 32, 4 ],
//   [ 2, 32, 8, 2 ],
//   [ 0, 0, 16, 8 ] ]

// lastDirection: 'down' },
//   score: 2142,
//   children: null }


