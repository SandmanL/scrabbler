/*
Dictates the flow of a turn as:
	-notifies current player of their turn and shows that player's rack
	-current player submits a proposed play or passes turn
		-if turn passed:
			-return any tiles used to current player's rack
			+current player receives a score of 0 for the turn
			-pass turn to next player
	-scores proposed play and tracks words played
	validate the current proposed play:
		if invalid: notice of illegal play and returns tiles to current player rack to continue turn.
	display proposed board to all players
	notifies all players of words played and total score for the turn
	gives opponents option to challenge current play for a [bet] amount of points:
		if challenge succeeds:
			notify all players ([challenger] has issued a challenge! Invalid words found: [invalid words]. [player name] loses their turn!)
			return tiles to current player's rack
			current player receives a score of 0 for the turn
			pass turn to next player
		if challenge fails:
			notify all players ([challenger] has issued a challenge! All words are valid. The challenge has failed. [challenger] loses [bet] points!)
			remove points from challenger(s)'s score
	adds score of proposed play to current player's score
	commits proposed board (newBoard) to the game board (oldBoard)
	refills current player's rack
	pass turn to next player
*/

//tracks turn number
let turnID = 0;
let currentPlayer;
let passCounter = 0;

//determining current player
function determineCurrentPlayer() {
	switch((turnID+numPlayers-1)%numPlayers) {
		case 0:
			currentPlayer = player1;
			break;
		case 1:
			currentPlayer = player2;
			break;
		case 2:
			currentPlayer = player3;
			break;
		case 3:
			currentPlayer = player4;
			break;
		default:
			currentPlayer = player1;
			alert("Could not find current player");
	}
}


//starting a turn
function turnStart() {
	turnID++;

	determineCurrentPlayer();

	draw();

	openMsgBox(currentPlayer.name + ", it's your turn!",renderRack);

	//renderRack();
}

//passing turn
function passTurn() {

	reclaimTiles();

	//increase pass counter
	passCounter++;
	//next players turn
	openMsgBox(currentPlayer.name + " has passed their turn.",endTurn);
}

function endTurn() {

	//commit new board to old board if there are changes
	if (tilesPlayed()){
		for (let i = 0;i<15;i++){
			for (let j = 0;j<15;j++){
				oldBoard[i][j] = newBoard[i][j];
			}
		}
	}

	renderLetters(oldBoard);

	if(!checkEndGame()) {
		//next players turn
		turnStart();
	}
}
//validates proposed play
function isValidPlay() {

	//checks if tiles placed are in a straight line
	function isInLine() {
		let matchX = true;
		let matchY = true;
		for (let i=0;i<tilesUsed-1;i++){
			//compare x values
			if (turnCoordinates[i][0] != turnCoordinates[i+1][0])
				matchX = false;
			//compare y value
			if (turnCoordinates[i][1] != turnCoordinates[i+1][1])
				matchY = false;
		}
		return (matchX || matchY);
	}

	//record number of tiles placed
	let tilesUsed = turnCoordinates.length;

	//if no tiles used, play is valid as pass
	if (tilesUsed == 0)
		return true;

	//check if its not the first turn of the game
	if(turnID-1) {
		//check for unconnected word

		//count length of primary word played
		let wordSize = wordsFound[0].length;

		//if no letters on board are used to make the word and
		//it is the only word played this turn, then word is not connected
		if (wordSize == tilesUsed && wordsFound.length < 2)
			return false;

		//if word is connected, check if it is in line
		return isInLine();
	} else {
		//first word cannot be a one letter word
		if (tilesUsed == 1)
			return false;

		//if word is in line
		if (isInLine()) {
			//check coordinates of tiles placed to see if starting tile is used
			for (let i=0;i<tilesUsed;i++){
				//compare x value
				if (turnCoordinates[i][0] == 7) {
					//compare y value
					if (turnCoordinates[i][1] == 7)
						//if one matches then play is valid
						return true;
				}
			}
		}

		//if none match or word is not in line, then play is invalid
		return false;
	}

	//default to valid play
	return true;
}

function submitPlay() {

	let score = scoreTurn();

	if (isValidPlay()) {

		//show all players the proposed board
		renderLetters(newBoard);

		if(wordsFound.length) {
			let turnWords = wordsFound.join(", ");

			openMsgBox(currentPlayer.name + " has played the word(s): <br/><br/>" + turnWords
				+ "<br/><br/>Total score for this turn: "+ score +"<br/><br/>Would you like to challenge this play?", endTurn);

			//TODO: add code for challenge

			//add score to player's total
			currentPlayer.score += score;
			//reset pass counter
			passCounter = 0;

		} else {
			//no words played
			passTurn();
		}

	} else {

		openMsgBox("This is not a valid play! Try again.",reclaimTiles);

	}
}

function checkEndGame(){
	//check for empty tile bag
	if (bagTiles.length == 0){
		//check if current player has gone out or if all players have passed.
		if(currentPlayer.rack.length == 0 || passCounter >= numPlayers){
			let finalScores = "";
			finalScores += player1.name + ": " + player1.score + "<br/>";
			finalScores += player2.name + ": " + player2.score + "<br/>";
			if (numPlayers > 2)
				finalScores += player3.name + ": " + player3.score + "<br/>";
			if (numPlayers == 4)
				finalScores += player4.name + ": " + player4.score + "<br/>";
			openMsgBox("The game has ended! The final scores are:<br/><br/>" + finalScores + "<br/>Thank you for playing!");
			return true;
		}
	}

	return false;
}