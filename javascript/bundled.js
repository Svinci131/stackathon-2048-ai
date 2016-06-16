(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict' 

const directions = require("./directions");
const transpose = require("./utils").transpose;
const twoOrFour = require("./utils").twoOrFour;


class board {
	constructor () {
		this.board = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
		this.lastOrientation = "horizontal";
		this.emptyspots = [[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3]];
		this.gameOver = false; 
	}
	//O(1) = add 2 or 4 to a random emptysquare w 0
	fillRandomEmptySpace() {
	 	const randomRowIndex = Math.round(Math.random() * (3 - 0) + 0);
		const randomRow = this.emptyspots[randomRowIndex];
		if (randomRow.length) {
			const indexToUpdate = Math.round(Math.random() * ((randomRow.length-1) - 0) + 0);
		 	const randomCell = randomRow[indexToUpdate];
		 	this.board[randomRowIndex][randomCell] = twoOrFour();
		 	this.emptyspots[randomRowIndex].splice(indexToUpdate, 1);
		}
		else this.gameOver = true;
	}
	//(string, string) 
	update (orientation, direction) {
		//if direction is diff transpose
		if (orientation !== this.lastOrientation) {
			this.board = transpose(this.board);
		}
		let swipeFunc = directions[orientation][direction];//define direction to swipe in 
		this.swipe(swipeFunc);//swipe
		this.lastOrientation = orientation;//reset orientation to avoid having transpose as often 
		//updates gameOver if no empty spaces
		this.fillRandomEmptySpace();//set a random zero space to 2 or 4(remove from empty spots)
	}
	//(func)- compress each row based on direction
	swipe (swipeInCurrDir) {
		//update each row on board
		for (let i = 0; i<4; i++) {
			this.board[i] = swipeInCurrDir(this.board[i]);
		}
	}
}

module.exports = function () {
	board;
}

},{"./directions":2,"./utils":5}],2:[function(require,module,exports){
'use strict'

var swipe = require("./swipe");

module.exports = {
	horizontal: {
		left: swipe.swipeLeft,
		right: swipe.swipeRight, 
	},
	vertical: {
		up: swipe.swipeLeft,
		down: swipe.swipeRight 
	}
};


},{"./swipe":4}],3:[function(require,module,exports){
'use strict' 

console.log("hi")
var board = require('./board');

//drawBoard 
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

},{"./board":1}],4:[function(require,module,exports){
'use strict'

const fillZeros = require("./utils").fillZeros;
//(arr) => (arr)
//O(n)
function swipeRight(arr) {
	let newArr = [0,0,0,0]; 
	let counter = 3;
	let ignore = {};
	
	for(let i = 3; i>=0; i--)  {
	    if (!ignore[i] && arr[i]) {
	        if (arr[i] !== arr[i-1]) {
	            newArr[counter] = arr[i];
	            counter--
	        }
	        else {
	            let sum = arr[i-1] + arr[i];
	            newArr[counter] = sum;
	            ignore[i-1] = true;
	            counter--
	        }
	    }
	}
   arr = newArr
   return arr;
}
//(arr) => (arr)
//O(n)
function swipeLeft(arr) {
	let newArr = []; 
	let ignore = {};
	for(let i = 0; i<4; i++)  {
	    if (!ignore[i] && arr[i]) {
	        if (arr[i] !== arr[i+1]) {
	            newArr.push(arr[i]);
	        }
	        else {
	            let sum = arr[i+1] + arr[i];
	            newArr.push(sum);
	            ignore[i+1] = true;
	        }
	    }
	}
	arr = newArr.concat(fillZeros(4-newArr.length));
	return arr;
}

module.exports = {
	swipeRight: swipeRight,
	swipeLeft: swipeLeft
}
},{"./utils":5}],5:[function(require,module,exports){
'use strict'

//insert random 
function twoOrFour () {
	var options = [4,2];
	var random = Math.round(Math.random() * (2 - 1) + 1) ;
	return options[random-1];
}

//(arr[arr]) => (arr[arr])
//O(n*n)
function transpose(arr) {
	let height = arr.length, 
		width = arr[0].length,
		t = [];

	  for(let i=0; i<height; i++) {

	    t[i] = [];
	    for(let j=0; j<width; j++) {
	      t[i][j] = arr[j][i];
	    }
	  }

	return t;
}

//(number) => arr- with length of num 
//O(n)
function fillZeros(length) {
    let newArr = [];
    for (let i = 0; i<length; i++){
        newArr.push(0)
    }
    return newArr
}


module.exports = {
	twoOrFour: twoOrFour,
	transpose: transpose,
	fillZeros: fillZeros
}
},{}]},{},[3]);
