'use strict'

var swipe = require("./swipe");

console.log("here", swipe);

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

