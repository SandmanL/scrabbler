/*
Holds player objects with properties:
	player name
	player rack
	player score
	player turn rank

Sets up player profiles by asking for number of players and player names.
*/

//assign number of players (from user input with data validation of 2-4 players)
let numPlayers = 2;

//create players (min 2)

let players = [{
	name: "Player1",
	rack: [],
	score: 0,
	order: 1,
}, {
	name: "Player2",
	rack: [],
	score: 0,
	order: 2,
}];

function createPlayers(quantity){
	if (quantity>2)
		players.push({
			name: "Player3",
			rack: [],
			score: 0,
			order: 3,
		});

	if (quantity == 4)
		players.push({
			name: "Player4",
			rack: [],
			score: 0,
			order: 4,
		});
}
function gameSetup1() {
	openMsgBoxInput("How many people will be playing today?", gameSetup2);
}

function gameSetup2() {
	recordInput();
	numPlayers = parseInt(textBoxContent, 10);
	if (numPlayers != 2 && numPlayers != 3 && numPlayers != 4)
		openMsgBox("Please enter a valid number of players (2, 3, or 4).", gameSetup1);
	else {
		createPlayers(numPlayers);
		openMsgBox("Great! Now, let's record the names of these " + numPlayers + " players.", gameSetup3);
		//shuffle(bagTiles);
	}
}

function gameSetup3() {
	openMsgBoxInput("Player 1, please enter your name:", gameSetup4);
}

function gameSetup4() {
	recordInput();
	players[0].name = textBoxContent;
	draw(players[0]);
	openMsgBoxInput("Player 2, please enter your name:", gameSetup5);
}

function gameSetup5() {
	recordInput();
	players[1].name = textBoxContent;
	draw(players[1]);
	if (numPlayers>2)
		openMsgBoxInput("Player 3, please enter your name:", gameSetup6);
	else
		openMsgBox("All done! Let's play!", turnStart);
}

function gameSetup6() {
	recordInput();
	players[2].name = textBoxContent;
	draw(players[2]);
	if(numPlayers==4)
		openMsgBoxInput("Player 4, please enter your name:", gameSetup7);
	else
		openMsgBox("All done! Let's play!", turnStart);
}

function gameSetup7() {
	recordInput();
	players[3].name = textBoxContent;
	draw(players[3]);
	openMsgBox("All done! Let's play!", turnStart);
}

gameSetup1();

