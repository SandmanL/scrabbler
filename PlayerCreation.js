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

turnStart();

