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
function draw(player = currentPlayer) {
	//find number of tiles to draw
	let n = handSize - player.rack.length;

	//draw new tiles
	for (let i = 0; i<n;i++){
		//if bag is not empty
		if (bagTiles.length){
			//find random position in bag
			let index=Math.floor(Math.random()*bagTiles.length);
			//add that letter to currentPlayer.rack
			player.rack.push(bagTiles[index]);
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
	//render an empty rack
	renderRack();

	//draw new tiles
	draw();

	//end current turn
	openMsgBox("All your tiles have been collected and you will be given a new set of tiles on your next turn!",endTurn);

}

function shuffle() {

	//copy array
	let reRack = [];
	reRack = reRack.concat(currentPlayer.rack);

	//note length of reRack
	let n = reRack.length;

	//empty arrray
	currentPlayer.rack =[];

	//shuffle
	for (let i = 0; i<n;i++){
		//find random position in copy
		let index=Math.floor(Math.random()*reRack.length);
		//add that letter to array
		currentPlayer.rack.push(reRack[index]);
		//remove it from copy
		reRack.splice(index, 1);
	}

	//to shuffle bag tiles in game setup (why cant I shuffle the bag?)
	if (turnID>0)
	//display shuffled array
		renderRack();
}

function makeBoardTile(letter, x, y) {
	return `<span class="boardTile" letter="${letter}" style = "top: ${y}px; left: ${x}px; position: absolute;">${letter}<span class="tileScore">${letterScore(letter)}</span></span>`;
}

function makeRackTile(letter, index) {
	return `<span class="rackTile" letter="${letter}" index="${index}">${letter}<span class="tileScore">${letterScore(letter)}</span></span>`;
}

function renderRack() {
	document.getElementById("rack").innerHTML = currentPlayer.rack.map((letter, index) => makeRackTile(letter, index)).join('');
	selectedTile = null;
}

//allows you to select a tile in your currentPlayer.rack
let selectedTile = null;
document.onclick = function (event) {
	const tile = event.target.closest('.rackTile');
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
	const x = event.pageX - 9;
	const y = event.pageY - 54;
	let xCoor = Math.floor(x/HorizSpacing);
	let yCoor = Math.floor(y/VertSpacing);
	//console.log(xCoor,yCoor,newBoard[yCoor][xCoor]);
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
	}
}


//returns tiles placed on board this turn back to currentPlayer.rack
function reclaimTiles() {
	//let letter = "";
	let xCoor;
	let yCoor;

	//find coordinates of tiles placed
	let tilesUsed = tilesPlayed();

	for (let i = 0; i<tilesUsed;i++){
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