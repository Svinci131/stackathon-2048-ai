//Alpha-beta pruning

//The Minimax is a recursive algorithm which can be used for solving two-player zero-sum games
//steps: 
	//searches through the space of possible game states creating a tree
	// which is expanded until it reaches a particular predefined depth
		//how deep should I define it

	//each level represents the turn of one of the two players. In order to win each player must select the move that minimizes the opponent’s maximum payoff.
	
//http://blog.datumbox.com/using-artificial-intelligence-to-solve-the-2048-game-java-code/

function createDelibrateState (board, orientation, direction) {
	let temp = new Board () 
	temp.board = board; 
	board.update(orientation, direction);
	return this.board;
}

function createAllPossibleDelibrateStates(board) {
	let right = createDelibrateState(board, "horizontal", "right");
	let left = createDelibrateState(board, "horizontal", "left");
	let up = createDelibrateState(board, "vertical", "up");
	let down = createDelibrateState(board, "vertical", "down");
	return [right, left, up, down];
}

function createRandomState (board, rowIndex, colIndex, val) {
	let temp = new Board () 
	temp.board = board; 
	temp.board[rowIndex][colIndex] = val;
	return this.board;
}

function createAllRandomStates(board) {
	let options = [2, 4];
	let possibleStates = [];
	for(let i = 0; i < 4; i++){
		let possibleRow = board[i];
		for(let j = 0; j < possibleRow.length; j++) {
			for(let k = 0; k < 2; k++) {
				let possibleState = createRandomState(i, j, options[k]);
				possibleStates.push(possibleState);
			}
		}
	}
	return possibleState;
}

class leaf {
	constructor (state, score) {
		this.state = state//board
		this.score = state.heuristicScore();
		this.children = null;
	}	
}
class tree {
	constructor () {
		let board = new board ();
		board.fillRandomEmptySpace();
		this.head = new leaf (board, board.score);
	}	
	start () {
		//minmax(this.head, 2, TRUE);
	}
	minmax(node, depth, maximizingPlayer) {

		// if (depth = 0) {
			//return node.score;
		// }

		

		//if maximizing player- ai
			//node.createAllPossibleStates(node.state.board);
			//bestVal = -Infinity;
			//node.children.forEach() {
				//val = let computer play
				//val = minmax(child, depth-1, FALSE)
				//bestValue = Math.max(bestValue, val); 
				//select best value from new states
				//return bestVal
			//}
		//});
		//else - normal comp
		//else {
			//
			//it shouldnt be trying to help use it should be random?
				//minimax(child, depth - 1, False)
				//node.children.forEach()
				//select worst value from new states -set as best?
				//return bestVal
			//
		//}
		

	}
}

//searches through the space of possible game states
// creating a tree which is expanded until it reaches a particular predefined depth. 

// let states = new tree ();
//minmax()
//minmax(node, depth, maximizingPlayer) {
	//counter
	//while(counter<depth) {

		//for


	//}
//}


