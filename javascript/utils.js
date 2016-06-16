'use strict'

//insert random 
function twoOrFour () {
	var options = [4,2];
	var random = Math.round(Math.random() * (2 - 1) + 1) ;
	return options[random-1];
}

//O(n)
//(arr[[], []]) => []
function getFlatArr (arr) {
	return arr.reduce((a, b) =>{
			a = a.concat(b);
			return a;
		}, []);
}
function absoluteDiff (x, y) {
	return x - y;
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

function getNeighbors (arr, i) {
	// var neighbors = {
	// 	top: arr[i-4],
	// 	right: arr[i+1],
	// 	down: arr[i+4],
	// 	left: arr[i-1]
	// };
	let neighbors = [arr[i-4], arr[i+1], arr[i+4], arr[i-1]];
	return neighbors
}

//ignore zeros//o(n)
function getAverageDiffSansZeros (arr) {
	let length = 0;
	let sum = arr.reduce((a, b) => {	
		if (b) {
			a += b;
			length++;
		}
		return a
	}, 0);
	
	if (sum) {
		return Math.floor(sum/length);
	}
	else {
		return 0;
	}
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
	fillZeros: fillZeros,
	getFlatArr: getFlatArr,
	absoluteDiff: absoluteDiff,
	getAverageDiffSansZeros: getAverageDiffSansZeros,
	getNeighbors: getNeighbors
}