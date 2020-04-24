/*
takes inputs of:
	array of ints (location and type of special tiles)
	array of chars1 (board state prior to move)
	array of chars2 (board state post move)
outputs:
	int value of score for current proposed move
	array of strings of new words made

to find score
	find locations of all new tiles placed (array of coordinates)
	use locations to determine if word played is vert or horiz
	find longest streak of letters in that direction containing those coordinates (note first and last coordinates)
	use letter values and special tiles (for new letters) to find score for this word
	for each new letter placed
		find longest streak of letters (len>1) in opposite direction of new word containing those coordinates (note first and last coordinates)
		use letter values and special tiles (for new letters) to find score for this word
	add up all scores found


*/

let oldBoard = [[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']];

let newBoard = [[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']];

let letterValues = [1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,10];

let wordsFound = [];
let turnCoordinates = [];

const letterBoard = document.getElementById("letterBoard");
letterBoard.style.width = `${boardW}px`;
letterBoard.style.height = `${boardH}px`;

function renderLetters(array){
	//clear letters
	let newHTML = "";
	//let tile = null;
	let x;
	let y;
	let pos = "";
	//draw new letter array
	for (let i=0; i<15;i++){
		for (let j=0; j<15;j++) {
			if (array[i][j] != ' ') {
				//attempt with makeTile function directly
				x = j*HorizSpacing+2;
				y = i*VertSpacing+2;
				pos = `style = "top: ${y}px; left: ${x}px; position: absolute;"`;
				newHTML += makeTile(array[i][j],-1,pos);

				//Attempt with style setting
				//tile.style.left = `${x}px`;
				//tile.style.top = `${y}px`;
				//document.getElementById('playArea').append(tile);

				//Original code
				//letterBoard.fillText(array[i][j],j*HorizSpacing+10,(i+1)*VertSpacing-10);
			}
		}
	}
	letterBoard.innerHTML = newHTML;

	//Chris Code
	//selectedTile.style.left = `${x-x%HorizSpacing+2}px`;
	//selectedTile.style.top = `${y-y%VertSpacing+2}px`;
	//document.body.append(selectedTile);
}

// finds coordinates of tiles played this turn and stores them to turnCoordinates
function tilesPlayed() {
	turnCoordinates = [];
	let k = 0;
	for (let i=0;i<15;i++){
		for(let j=0;j<15;j++){
			if (newBoard[i][j]!=oldBoard[i][j]&&oldBoard[i][j]==' ') {
				turnCoordinates[k]=[j,i];
				k++;
			}
		}
	}
}

function scoreTurn(){
/*
to find score
-find locations of all new tiles placed (array of coordinates)
-use locations to determine if word played is vert or horiz
-find longest streak of letters in that direction containing those coordinates (note first and last coordinates)
-use letter values and special tiles (for new letters) to find score for this word
	for each new letter placed
		find longest streak of letters (len>1) in opposite direction of new word containing those coordinates (note first and last coordinates)
		use letter values and special tiles (for new letters) to find score for this word
	add up all scores found


*/
	wordsFound =[];
	let scoringWords = [];
	let wordMultis = [];
	let turnScore = 0;

	// find coordinates of new letters played
	tilesPlayed();

	//only one new tile placed
	if (turnCoordinates.length==1){
		let xCoor = turnCoordinates[0][0];
		let yCoor = turnCoordinates[0][1];

		//find longest horizontal word
		let left = findLeft(xCoor,yCoor);
		let right = findRight(xCoor,yCoor);

		scoringWords.push(getHorizWord(left,right,yCoor));
		wordMultis.push(getHorizMulti(left,right,yCoor));

		//find longest vertical word
		let top = findTop(xCoor,yCoor);
		let bot = findBot(xCoor,yCoor);

		scoringWords.push(getVertWord(xCoor,top,bot));
		wordMultis.push(getVertMulti(xCoor,top,bot));

	//more than one new tile placed
	}else if(turnCoordinates.length>1){
		//check if new word is vertical
		if(turnCoordinates[0][0]==turnCoordinates[1][0]){
			//find longest vertical word
			let xCoor = turnCoordinates[0][0];
			let yCoor = turnCoordinates[0][1];
			let top = findTop(xCoor,yCoor);
			let bot = findBot(xCoor,yCoor);

			scoringWords.push(getVertWord(xCoor,top,bot));
			wordMultis.push(getVertMulti(xCoor,top,bot));

			//for each new tile, look for new words horizontally
			for (let i = 0; i<turnCoordinates.length;i++){
				xCoor = turnCoordinates[i][0];
				yCoor = turnCoordinates[i][1];
				let left = findLeft(xCoor,yCoor);
				let right = findRight(xCoor,yCoor);

				scoringWords.push(getHorizWord(left,right,yCoor));
				wordMultis.push(getHorizMulti(left,right,yCoor));

			}

		} else {
			//find longest horizontal word
			let xCoor = turnCoordinates[0][0];
			let yCoor = turnCoordinates[0][1];
			let left = findLeft(xCoor,yCoor);
			let right = findRight(xCoor,yCoor);

			scoringWords.push(getHorizWord(left,right,yCoor));
			wordMultis.push(getHorizMulti(left,right,yCoor));

			//for each new tile, look for new words vertically
			for (let i = 0; i<turnCoordinates.length;i++){
				xCoor = turnCoordinates[i][0];
				yCoor = turnCoordinates[i][1];
				let top = findTop(xCoor,yCoor);
				let bot = findBot(xCoor,yCoor);

				scoringWords.push(getVertWord(xCoor,top,bot));
				wordMultis.push(getVertMulti(xCoor,top,bot));

			}
		}
	}
	
	console.log(isValidPlay());

	//finds top end of a sequence of continuous letters
	function findTop(x,y){
		while(y>=0&&newBoard[y][x]!=' ') y--;
		return y+1;
	}
	//finds bot end of a sequence of continuous letters
	function findBot(x,y) {
		while(y<15&&newBoard[y][x]!=' ') y++;
		return y-1;
	}
	//finds left end of a sequence of continuous letters
	function findLeft(x,y) {
		while(x>=0&&newBoard[y][x]!=' ') x--;
		return x+1;
	}
	//finds right end of a sequence of continuous letters
	function findRight(x,y) {
		while(x<15&&newBoard[y][x]!=' ') x++;
		return x-1;
	}
	//gets word between two y coordinates
	function getVertWord(x,y1,y2){
		//cancel function if word isnt at least 2 tiles long or incorrect order is given
		if(y2<=y1) return "";

		let word = "";
		let found = "";
		for (let j = y1; j <= y2; j++){
			//find special tiles under new letters
			if (colored[j][x]<3&&oldBoard[j][x]==' '){
				for (let k = 0;k<(colored[j][x]+1);k++)
					//record n letters based on special tile for scoring the word
					word = word + newBoard[j][x];
			} else {
				//if no appropriate special tile was found or is not new tile, add 1 letter
				word = word + newBoard[j][x];
			}
			//always records one letter to record words found
			found = found + newBoard[j][x];
		}
		wordsFound.push(found);
		return word;
	}
	//gets word score multiplier found between two y coordinates
	function getVertMulti(x,y1,y2){
		//cancel function if word isnt at least 2 tiles long or incorrect order is given
		if(y2<=y1) return 0;

		let multi = 1;
		for (let j = y1; j <= y2; j++){
			//record multiplier found only if tile is new
			if (colored[j][x]>2&&oldBoard[j][x]==' '){
				multi = multi*(colored[j][x]-1);
			}
		}
		return multi;
	}
	//gets word between two x coordinates
	function getHorizWord(x1,x2,y){
		//cancel function if word isnt at least 2 tiles long or incorrect order is given
		if(x2<=x1) return "";

		let word = "";
		let found = "";
		for (let i = x1; i <= x2; i++){
			//find special tiles under new letters
			if (colored[y][i]<3&&oldBoard[y][i]==' '){
				for (let k = 0;k<(colored[y][i]+1);k++)
					//record n letters based on special tile for scoring the word
					word = word + newBoard[y][i];
			} else {
				//if no appropriate special tile was found or is not new tile, add 1 letter
				word = word + newBoard[y][i];
			}
			//always records one letter to track words found
			found = found + newBoard[y][i];
		}
		wordsFound.push(found);
		return word;
	}
	//gets word score multiplier found between two x coordinates
	function getHorizMulti(x1,x2,y){
		//cancel function if word isnt at least 2 tiles long or incorrect order is given
		if(x2<=x1) return 0;

		let multi = 1;
		for (let i = x1; i <= x2; i++){
			//record multiplier found only if tile is new
			if (colored[y][i]>2&&oldBoard[y][i]==' '){
				multi = multi*(colored[y][i]-1);
			}
		}
		return multi;
	}
	
	//scoring new words
	let wordScore;
	for (let i =0; i < scoringWords.length;i++){
		wordScore = 0;
		for (let j = 0; j < scoringWords[i].length;j++){
			wordScore = wordScore + letterScore(scoringWords[i][j]);
		}
		turnScore = turnScore + wordScore*wordMultis[i];
	}
	console.log("Score for this turn is " + turnScore);
}

//gets value of a letter
function letterScore(letter) {
	return letterValues[letter.charCodeAt(0)-65];
}

//Shows words played during current turn
function displayTurn(){
	console.log(wordsFound);
}