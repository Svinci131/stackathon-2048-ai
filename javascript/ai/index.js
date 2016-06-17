//Alpha-beta pruning
'use strict'

const Board = require("../board");
const createAllPossibleRandomStates  = require('./stateGeneration').createAllPossibleRandomStates;
const createAllPossibleDelibrateStates = require('./stateGeneration').createAllPossibleDelibrateStates;
const Node = require("./node");

class tree {
	constructor () {
		let board = new Board ();
		//otherwise there is no worst move
		board.fillRandomEmptySpace();
		this.head = new Node (board);
		this.bestDirections = [];
	}	
	minimax (node, depth, maximizingPlayer) {
		// console.log(depth);

		if (depth === 0 || node.boardObj.gameOver) {
			return node; 
		}
		
		if (maximizingPlayer) {  //ai 
			node.children = createAllPossibleDelibrateStates(node);
			let best = -Infinity;
			// console.log(depth, "p1", node);
			node.children.forEach(child => {
				let val = this.minimax(child, depth-1, false); 
				if (best instanceof Node) {
					best = best.score > val.score ? best : val;
				}
				else best = best > val.score ? best : val;
			});

			// this.bestDirections.push(best.boardObj.lastOrientaion);
			// console.log(depth, "p1", bestVal);
			return best;
		}
		
		else { //normal comp
			
			node.children = createAllPossibleRandomStates(node);
			let best = Infinity;
			// console.log(depth, "p2", node);
			node.children.forEach(child => {
				let val = this.minimax(child, depth - 1, true);
				//we want to assume the worst
				if (best instanceof Node) {
					best = best.score < val.score ? best : val;
				}
				else best = best < val.score ? best : val;
				// bestVal = Math.min(bestVal, val);			
			});

			return best;
		}
	}
}



let Tree = new tree ();

Tree.minimax(Tree.head, 3, true);
console.log(Tree.bestDirections);


//The Minimax is a recursive algorithm which can be used for solving two-player zero-sum games
//steps: 
	//searches through the space of possible game states creating a tree
	// which is expanded until it reaches a particular predefined depth
		//how deep should I define it

	//each level represents the turn of one of the two players. In order to win each player must select the move that minimizes the opponent’s maximum payoff.
	
//http://blog.datumbox.com/using-artificial-intelligence-to-solve-the-2048-game-java-code/


