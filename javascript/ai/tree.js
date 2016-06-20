//Alpha-beta pruning
'use strict'

const Board = require("../board");
const createAllPossibleRandomStates  = require('./stateGeneration').createAllPossibleRandomStates;
const createAllPossibleDelibrateStates = require('./stateGeneration').createAllPossibleDelibrateStates;
const Node = require("./node");

class Tree {
	constructor (board) {
		this.head = new Node (board); 
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
		if (a instanceof Node) a = a.score > b.score ? a : b;
		else a = a > b.score ? a : b;
		return a;
	}
	shouldBreak(a, b) {
		let aVal, bVal;
		if (a instanceof Node) aVal = a.score;
		else aVal = a;
		if (b instanceof Node) bVal = b.score;
		else bVal = b;
		return (a <= b);
	}
	seeChildScores(arr) {
		return arr.map(child => {
			return [child.score, child.boardObj.lastDirection];
		});
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
				// console.log('BREAK STATE', a, b, i);
				// console.log('================')
				// console.log('A: ', a.score || a );
				// console.log('B: ', b.score || b );
				// console.log('i: ', i );
				// console.log('================')
				if (this.shouldBreak(a, b)) {
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
				// console.log('================0')
				// console.log('A: ', a.score || a );
				// console.log('B: ', b.score || b );
				// console.log('i: ', i );
				// console.log('================')
				if (this.shouldBreak(a, b)) {
					break;
				}
			}

			if (!node.children.length) {
				node.children = null;
				b = this.alphaBeta(node, depth-1, a, b, true);
				// console.log('================1')
				// console.log('A: ', a.score || a );
				// console.log('B: ', b.score || b );
				// console.log('================')
			}
			return b;
		}
	}
	minimax (node, depth, maximizingPlayer) {
		if (depth === 0 || node.break) {
			return node; 
		}
		if (maximizingPlayer) {  //ai 
			node.children = createAllPossibleDelibrateStates(node);
			let best = -Infinity;
			node.children.forEach(child => {
				let val = this.minimax(child, depth-1, false); 
				best = this.max(best, val);
			});
			// console.log("AFTER HERE22", best.boardObj.board)
			// // console.log("node", node);
			// // console.log('////////////////')
			// // console.log("best", best);
			// console.log("options", this.seeChildScores(node.children))
			return best;
		}
		else { //normal comp
			node.children = createAllPossibleRandomStates(node);
			let best = Infinity;
			node.children.forEach(child => {
				let val = this.minimax(child, depth - 1, true);
				//we want to assume the worst
				best = this.min(best, val);	
			});
			//if there are no open squares send back curr board
			if (!node.children.length) {
				// console.log("HERE12", node.score)
				// console.log(node.boardObj.board);// return node;
				node.children = null;
				best = this.minimax(node, depth - 1, true);
			}
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


