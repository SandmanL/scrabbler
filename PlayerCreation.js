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

let player1 = {
	name: "Player1",
	rack: [],
	score: 0,
	order: 1,
};

let player2 = {
	name: "Player2",
	rack: [],
	score: 0,
	order: 2,
};

let player3;
let player4;

function createPlayers(quantity){
	numPlayers = quantity;
	if (numPlayers>2)
		player3 = {
			name: "Player3",
			rack: [],
			score: 0,
			order: 3,
		};

	if (numPlayers == 4)
		player4 = {
			name: "Player4",
			rack: [],
			score: 0,
			order: 4,
		};
}
function gameSetup1() {
	openMsgBoxInput("How many people will be playing today?", gameSetup2);
}

function gameSetup2() {
	recordInput();
	let players = parseInt(textBoxContent, 10);
	if (players != 2 && players != 3 && players != 4)
		openMsgBox("Please enter a valid number of players (2, 3, or 4).", gameSetup1);
	else {
		createPlayers(players);
		openMsgBox("Great! Now, let's record the names of these " + players + " players.", gameSetup3);
		//shuffle(bagTiles);
	}
}

function gameSetup3() {
	openMsgBoxInput("Player 1, please enter your name:", gameSetup4);
}

function gameSetup4() {
	recordInput();
	player1.name = textBoxContent;
	draw(player1);
	openMsgBoxInput("Player 2, please enter your name:", gameSetup5);
}

function gameSetup5() {
	recordInput();
	player2.name = textBoxContent;
	draw(player2);
	if (numPlayers>2)
		openMsgBoxInput("Player 3, please enter your name:", gameSetup6);
	else
		openMsgBox("All done! Let's play!", turnStart);
}

function gameSetup6() {
	recordInput();
	player3.name = textBoxContent;
	draw(player3);
	if(numPlayers==4)
		openMsgBoxInput("Player 4, please enter your name:", gameSetup7);
	else
		openMsgBox("All done! Let's play!", turnStart);
}

function gameSetup7() {
	recordInput();
	player4.name = textBoxContent;
	draw(player4);
	openMsgBox("All done! Let's play!", turnStart);
}

gameSetup1();

