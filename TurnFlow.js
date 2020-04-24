/*
Dictates the flow of a turn as:
	current player submits a proposed play or passes turn
		if turn passed:
			return any tiles used to current player's rack
			current player receives a score of 0 for the turn
			pass turn to next player
	scores proposed play and tracks words played
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
			for (let i=0;i<turnCoordinates.length;i++){
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