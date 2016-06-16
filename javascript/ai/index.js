//Alpha-beta pruning
'use strict'

const createAllPossibleDelibrateStates  = require('./stateGeneration').createAllPossibleRandomStates;
const createAllPossibleRandomStates = require('./stateGeneration').createAllPossibleDelibrateStates;


//The Minimax is a recursive algorithm which can be used for solving two-player zero-sum games
//steps: 
	//searches through the space of possible game states creating a tree
	// which is expanded until it reaches a particular predefined depth
		//how deep should I define it

	//each level represents the turn of one of the two players. In order to win each player must select the move that minimizes the opponent’s maximum payoff.
	
//http://blog.datumbox.com/using-artificial-intelligence-to-solve-the-2048-game-java-code/



class leaf {
	constructor (state, score) {
		this.state = state//board
		this.score = state.heuristicScore();
		this.children = null;
	}	
}
class tree {
	constructor () {
		let Board = new board ();
		//otherwise there is no worst move
		Board.fillRandomEmptySpace();
		this.head = new leaf (board, board.score);
	}	
	minimax (node, depth, maximizingPlayer) {
		if (depth === 0) {
			return node.score;
		}
		if (maximizingPlayer) {  //ai
			node.children = createAllPossibleDelibrateStates(node.state.board);
			let bestVal = -Infinity;
			node.children.forEach(child => {
				let val = minmax(child, depth-1, FALSE); 
				//select best value from new states
				bestVal = Math.max(bestVal, val);
				return bestVal;
			});
		}
		
		else { //normal comp
			node.children = createAllPossibleRandomStates(node.state.board);
			node.children.forEach(child => {
				let val = minimax(child, depth - 1, TRUE);
				//we want to assume the worst
				let bestVal = Math.min(bestVal, val);
				return bestVal; 
			});
		}
	}
}

minmax(this.head, 2, TRUE);




