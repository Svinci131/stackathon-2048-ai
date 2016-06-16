//Alpha-beta pruning
'use strict'

const Board = require("../board");
const createAllPossibleRandomStates  = require('./stateGeneration').createAllPossibleRandomStates;
const createAllPossibleDelibrateStates = require('./stateGeneration').createAllPossibleDelibrateStates;
const Node = require("./node");
//The Minimax is a recursive algorithm which can be used for solving two-player zero-sum games
//steps: 
	//searches through the space of possible game states creating a tree
	// which is expanded until it reaches a particular predefined depth
		//how deep should I define it

	//each level represents the turn of one of the two players. In order to win each player must select the move that minimizes the opponent’s maximum payoff.
	
//http://blog.datumbox.com/using-artificial-intelligence-to-solve-the-2048-game-java-code/


class tree {
	constructor () {
		let board = new Board ();
		//otherwise there is no worst move
		board.fillRandomEmptySpace();
		this.head = new Node (board);
	}	
	minimax (node, depth, maximizingPlayer) {
		
		if (depth === 0) {
			return node.score;
		}
		if (maximizingPlayer) {  //ai
		
			node.children = createAllPossibleDelibrateStates(currNode);
			let bestVal = -Infinity;
			// console.log(depth, "p1", node);
			node.children.forEach(child => {
				let val = this.minimax(child, depth-1, false); 
				// //select best value from new states
				bestVal = Math.max(bestVal, val);
			});
			return bestVal;
		}
		
		else { //normal comp
			
			node.children = createAllPossibleRandomStates(node.state);
			let bestVal = Infinity;
			// console.log(depth, "p2", node);

			node.children.forEach(child => {
				let val = this.minimax(child, depth - 1, true);
				//we want to assume the worst
				bestVal = Math.min(bestVal, val);			
			});
			return bestVal;
		}
	}
}



let Tree = new tree ();

console.log(Tree.minimax(Tree.head, 2, true));



