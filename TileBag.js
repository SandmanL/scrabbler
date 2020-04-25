/*
Bag of letter tiles for game
	Can draw n tiles at a time
	keeps tcurrentPlayer.rack of # of tiles in bag

players currentPlayer.rack of letters
	can shuffle letters
	can swap letters with bag for new set

	to do:
		manually rearrange letters in currentPlayer.rack
		place letters on board
		get placed letters back from board
*/
let bagTiles = ['E','E','E','E','E','E','E','E','E','E','E','E',
				'A','A','A','A','A','A','A','A','A',
				'I','I','I','I','I','I','I','I','I',
				'O','O','O','O','O','O','O','O','G','G','G',
				'N','N','N','N','N','N','R','R','R','R','R','R',
				'T','T','T','T','T','T','D','D','D','D',
				'L','S','U','L','S','U','L','S','U','L','S','U',
				'B','C','M','P','F','H','B','C','M','P','F','H',
				'V','W','Y','V','W','Y','K','J','X','Q','Z'];

const handSize = 7;

//draw more tiles as the last action in turn;
function draw() {
	//find number of tiles to draw
	let n = handSize - currentPlayer.rack.length;

	//draw new tiles
	for (let i = 0; i<n;i++){
		//if bag is not empty
		if (bagTiles.length){
			//find random position in bag
			let index=Math.floor(Math.random()*bagTiles.length);
			//add that letter to currentPlayer.rack
			currentPlayer.rack.push(bagTiles[index]);
			//remove it from bag
			bagTiles.splice(index, 1);
		}
	}
}

function swap() {
	//return all tiles played to rack
	reclaimTiles();

	//find number of tiles to swap
	let n = currentPlayer.rack.length;

	//empty currentPlayer.rack into bag
	for (let i = 0; i<n;i++){
		bagTiles.push(currentPlayer.rack.pop());
	}
	//draw new tiles
	draw();

	//pass turn
	passTurn();

}

function shuffle() {

	//copy currentPlayer.rack
	let reRack = [];
	reRack = reRack.concat(currentPlayer.rack);

	//note length of reRack
	let n = reRack.length;

	//empty currentPlayer.rack
	currentPlayer.rack =[];

	//shuffle
	for (let i = 0; i<n;i++){
		//find random position in reRack copy
		let index=Math.floor(Math.random()*reRack.length);
		//add that letter to currentPlayer.rack
		currentPlayer.rack.push(reRack[index]);
		//remove it from reRack copy
		reRack.splice(index, 1);
	}

	//display shuffled currentPlayer.rack
	renderRack();
}

function makeTile(letter, index, pos = '') {
	return `<span class="tile" letter="${letter}" index="${index}" ${pos}>${letter}<span class="tileScore">${letterScore(letter)}</span></span>`;
}

function renderRack() {
	document.getElementById("rack").innerHTML = currentPlayer.rack.map((letter, index) => makeTile(letter, index)).join('');
    //letter.style.left = `${x}px`;
}

//allows you to select a tile in your currentPlayer.rack
let selectedTile = null;
document.onclick = function (event) {
	const tile = event.target.closest('.tile');
	if (tile) {
		if (selectedTile) {
			selectedTile.classList.remove('selected');
		}
		selectedTile = tile;
		selectedTile.classList.add('selected');
	}
}


//places tiles from currentPlayer.rack to board
letterBoard.onclick = function (event) {
	const x = event.offsetX;
	const y = event.offsetY;
	let xCoor = Math.floor(x/HorizSpacing);
	let yCoor = Math.floor(y/VertSpacing);

	//if a tile from currentPlayer.rack is selected && board position is empty
	if (selectedTile && newBoard[yCoor][xCoor] == ' '){
		//add selected tile letter to new board
		newBoard[yCoor][xCoor] = selectedTile.getAttribute('letter');

		//display new board
		renderLetters(newBoard);

		//remove tile from currentPlayer.rack
		let index = Number(selectedTile.getAttribute('index'));
		currentPlayer.rack.splice(index, 1);

		//re render currentPlayer.rack;
		renderRack();
		selectedTile = null;
	}
}


//returns tiles placed on board this turn back to currentPlayer.rack
function reclaimTiles() {
	let letter = "";
	let xCoor;
	let yCoor;

	//find coordinates of tiles placed
	tilesPlayed();

	for (let i = 0; i<turnCoordinates.length;i++){
		xCoor = turnCoordinates[i][0];
		yCoor = turnCoordinates[i][1];
		//add letter back to currentPlayer.rack
		currentPlayer.rack.push(newBoard[yCoor][xCoor]);
		//clear letter from new board
		newBoard[yCoor][xCoor] = ' ';
	}

	//re render old board
	renderLetters(oldBoard);
	//re render currentPlayer.rack
	renderRack();


}