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