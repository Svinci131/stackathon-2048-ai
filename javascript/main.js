'use strict' 

//initial setup
var board = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
var lastDirection = "right";
var emptyspots = [[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3]];

//update
function update(direction) {
}
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
//(number) => arr- with length of num 
//O(n)
function fillZeros(length) {
    let newArr = [];
    for (let i = 0; i<length; i++){
        newArr.push(0)
    }
    return newArr
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

//insert random 
function twoOrFour () {
	var options = [4,2];
	var random = Math.round(Math.random() * (2 - 1) + 1) ;
	return options[random-1];
}

//O(1) = add 2 or 4 to a square w 0
function fillRandomEmptySpace() {
 	const randomRowIndex = Math.round(Math.random() * (3 - 0) + 0);
	const randomRow = emptyspots[randomRowIndex];
 	const indexToUpdate = Math.round(Math.random() * ((randomRow.length-1) - 0) + 0);
 	const randomCell = randomRow[indexToUpdate];
 
 	board[randomRowIndex][randomCell] = twoOrFour();
 	emptyspots[randomRowIndex].splice(indexToUpdate, 1);
 	return board;
}

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

const directions = {
	left: swipeLeft,
	right: swipeRight, 
	up: swipeLeft,
	down: swipeRight 
}

function swipe (direction, board) {
	if (direction !== lastDirection) {
		board = transpose(board);

	}

	for (let i = 0; i<4; i++) {
		directions[direction](board[i]);
	}
	
	
	return board;
}


fillRandomEmptySpace();
// render (board);


module.exports = {
	transpose: transpose,
	fillRandomEmptySpace: fillRandomEmptySpace,
	swipe: swipe,
	swipeRight: swipeRight,
	swipeLeft: swipeLeft

}
