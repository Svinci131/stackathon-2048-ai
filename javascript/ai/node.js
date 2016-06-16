'use strict'

class Node {
	//(obj-instance Board);
	constructor (boardObj) {
		this.boardObj = boardObj;
		this.score = boardObj.heuristicScore();
		this.children = null;
	}	
}

module.exports = Node;