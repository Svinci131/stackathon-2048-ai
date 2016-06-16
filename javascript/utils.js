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