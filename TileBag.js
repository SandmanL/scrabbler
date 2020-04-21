/*
Bag of letter tiles for game
	Can draw n tiles at a time
	keeps track of # of tiles in bag

inputs:
	int number of tiles to be drawn

outputs:
	array of characters size of input from available letters (or less if unavailable)
	int number of tiles left in bag

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

let rack = [];
const handSize = 7;

function draw() {
	//find number of tiles to draw
	let n = handSize - rack.length;

	//draw new tiles
	for (let i = 0; i<n;i++){
		//find random position in bag
		let index=Math.floor(Math.random()*bagTiles.length);
		//add that letter to rack
		rack.push(bagTiles[index]);
		//remove it from bag
		bagTiles.splice(index, 1);
	}

	//display bag and rack
	renderRack();
}

function swap() {

	//find number of tiles to swap
	let n = rack.length;

	//empty rack into bag
	for (let i = 0; i<n;i++){
		bagTiles.push(rack.pop());
	}
	//draw new tiles
	draw();

}

function shuffle() {

	//copy rack
	let reRack = [];
	reRack = reRack.concat(rack);

	//note length of reRack
	let n = reRack.length;

	//empty rack
	rack =[];

	//shuffle
	for (let i = 0; i<n;i++){
		//find random position in reRack copy
		let index=Math.floor(Math.random()*reRack.length);
		//add that letter to rack
		rack.push(reRack[index]);
		//remove it from reRack copy
		reRack.splice(index, 1);
	}

	//display shuffled rack
	renderRack();
}

function renderRack() {
	document.getElementById("rack").innerHTML = rack.map(letter =>
		`<span class="tile" letter="${letter}">${letter}<span class="tileScore">${letterScore(letter)}</span></span>`).join('');
    //letter.style.left = `${x}px`;
}

let selectedTile = null;

document.onclick = function (event) {
	const tile = event.target.closest('.tile');
	if (tile) {
		if (selectedTile) {
			selectedTile.classList.remove('selected');
		}
		selectedTile = tile;
		selectedTile.classList.add('selected');
		console.log(tile.getAttribute('letter'));
	}
}