'use strict' 

console.log("hi")
const board = require('./board');
const gameBoard = new board(); 
const directions = require("./directions")


console.log(directions, gameBoard);
	// //drawBoard 
	// function render (board) {
	// 	for (let i = 0; i<4; i++) {
	// 		for (let j = 0; j<4; j++) { 
	// 			if (board[i][j]) {
	// 				let el = $('[data-cellid="'+i+"-"+j+'"]');
	// 				$(el).append('<div><h1>'+board[i][j]+'</h1></div>')
	// 				console.log(el)
	// 			}
	// 		}
	// 	}
	// }


	// render();
