// //drawBoard 
module.exports = function (gameBoard) {
	let board = gameBoard.board;
	let orientation = gameBoard.lastOrientation;
	let row, col;
	for (let i = 0; i<4; i++) {
		for (let j = 0; j<4; j++) { 
			if (orientation === "horizontal") {
				row = i;
				col = j;
			}
			else {
				row = j;
				col = i;
			}
			let el = $('[data-cellid="'+row+"-"+col+'"]');
			if (el.text() !== board[row][col]) {
				el.empty();
				if (board[row][col]) {
					$(el).html('<div class="cell-num"><h1>'+board[row][col]+'</h1></div>')
				}
				else {
					$(el).html('<div class="cell-num zero"><h1>'+board[row][col]+'</h1></div>')
				}
			}
			
		}
	}
}
