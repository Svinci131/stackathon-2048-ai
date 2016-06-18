//Alpha-beta pruning
'use strict'

const Board = require("../board");
const createAllPossibleRandomStates  = require('./stateGeneration').createAllPossibleRandomStates;
const createAllPossibleDelibrateStates = require('./stateGeneration').createAllPossibleDelibrateStates;
const Node = require("./node");

class Tree {
	constructor (board) {
		this.head = new Node (board);
		this.bestDirections = [];
	}	
	min (a, b) {
		if (a instanceof Node) {
			a = a.score < b.score ? a : b;
		}
		else {
			a = a < b.score ? a : b;
		}
		return a;
	}
	max (a, b) {

		if (a instanceof Node) {
			a = a.score > b.score ? a : b;
		}
		else {
			a = a > b.score ? a : b;
		}
		return a;
	}
	alphaBeta (node, depth, a, b, maximizingPlayer) {
		// console.log(depth, maximizingPlayer, a, b)
		if (depth === 0) {
			return node; 
		}
		if (maximizingPlayer) {  //ai 
			node.children = createAllPossibleDelibrateStates(node);
			
			for(let i = 0; i < node.children.length; i++) {
				let child = node.children[i];
				a = this.max(a, this.alphaBeta(child, depth-1, a, b, false));
				if (b <= a) {
					break;
				}
			}
			return a;
		}
		else {
			node.children = createAllPossibleRandomStates(node);
			for(let i = 0; i < node.children.length; i++) {
				let child = node.children[i];
				b = this.min(b, this.alphaBeta(child, depth-1, a, b, true));			
				if (b <= a) {
					break;
				}
			}
			if (!node.children.length) {
				node.children = null;
				b = this.alphaBeta(node, depth-1, a, b, true);
			}
			return b;
		}
	}
	minimax (node, depth, maximizingPlayer) {
		
		if (depth === 0) {
			return node; 
		}
		
		if (maximizingPlayer) {  //ai 
			console.log("playerone")
			
			node.children = createAllPossibleDelibrateStates(node);
			if (node.marker) {
				console.log("sent back", node.children)
			}
			let best = -Infinity;
			node.children.forEach(child => {
				let val = this.minimax(child, depth-1, false); 

				if (best instanceof Node) {

					best = best.score > val.score ? best : val;
				}
				else {
					if (best === Infinity) {
						console.log(best, val);
					}
					best = best > val.score ? best : val;
				}
		
			});

			return best;
		}
		
		else { //normal comp
			console.log("playerTwo");
			//get all 
			node.children = createAllPossibleRandomStates(node);
			let best = Infinity;
			//if there are no possible places it could put a 2 or 4
			
			// console.log(depth, "p2", node);
			node.children.forEach(child => {
				let val = this.minimax(child, depth - 1, true);
				//we want to assume the worst
				if (best instanceof Node) {
					best = best.score > val.score ? val : best;
				}
				else {
					best = best > val.score ? val : best;
				}			
			});
			if (!node.children.length) {
				node.children = null;
				node.marker = "no random";
				best = this.minimax(node, depth - 1, true);
			}
			console.log("best", best.boardObj.board);
			return best;
		}
	}
}



// let Tree = new tree ();

// let bestMove = Tree.minimax(Tree.head, 6, true);
// console.log("here", bestMove);

module.exports = Tree;
//The Minimax is a recursive algorithm which can be used for solving two-player zero-sum games
//steps: 
	//searches through the space of possible game states creating a tree
	// which is expanded until it reaches a particular predefined depth
		//how deep should I define it

	//each level represents the turn of one of the two players. In order to win each player must select the move that minimizes the opponent’s maximum payoff.
	
//http://blog.datumbox.com/using-artificial-intelligence-to-solve-the-2048-game-java-code/


