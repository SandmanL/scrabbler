
const boardCanvas = document.getElementById("boardCanvas");
const board = boardCanvas.getContext("2d");
const tileW = 40;
const tileH = tileW;
const boardH = tileH*15+16;
const boardW = boardH;
const legendW = 250;
boardCanvas.height = boardH;
boardCanvas.width = boardW + legendW;
board.font="20px Georgia";
board.linewidth = "1";
board.strokeStyle = "grey";
board.fillStyle = "#FF0000";
const HorizSpacing = tileW+1;
const VertSpacing =tileH+1;

//2d array of 0's to store which tiles have been colored
let colored = [];

//load a classic board
classic();

function resetColored() {
	for (let i =0; i<15;i++){
		colored[i] = [];
		for (let j = 0; j<15; j++) {
			colored[i][j] = 0;
		}
	}
}

function legend() {
	const gap = 30;
	let txt = "Error";
	board.font="20px Georgia";

	function description(tier){

		board.beginPath();
		board.moveTo(boardW + gap, gap*tier + (tier-1)*(tileH+2));
		board.lineTo(boardW + gap,  gap*tier + (tier)*(tileH+2));
		board.lineTo(boardW + gap + tileW + 2, gap*tier + (tier)*(tileH+2));
		board.lineTo(boardW + gap + tileW + 2, gap*tier + (tier-1)*(tileH+2));
		board.closePath();
		board.stroke();
		colorPicker(tier);
		board.fillRect(boardW + gap + 1, gap*tier + (tier-1)*(tileH+2)+1,tileW,tileH);
		switch (tier) {
			case 1: txt = "Double Letter"; break;
			case 2: txt = "Triple Letter"; break;
			case 3: txt = "Double Word"; break;
			case 4: txt = "Triple Word"; break;
			default: txt = "Error";
		}
		board.fillText(txt, boardW + gap*1.5 + tileW, gap*(tier+1) + (tier-1)*(tileH+2));

	}

	for (let i=0;i<4;i++) description(i+1);

}

function displayScores() {
	const gap = 30;
	let txt = "Error";
	board.font="20px Georgia";
	board.fillStyle = "#000000";
	board.textBaseline = "middle";
	const midline = boardH - gap - 130;

	board.beginPath();
	board.moveTo(boardW + legendW - gap, boardH - gap);
	board.lineTo(boardW + legendW - gap, boardH - gap - 260);
	board.lineTo(boardW + gap, boardH - gap - 260);
	board.lineTo(boardW + gap, boardH - gap);
	board.closePath();
	board.stroke();

	let y = midline - (numPlayers*2-1)/2*gap;
	for (let i = 0; i<numPlayers;i++) {
		txt = players[i].name + ": ";
		board.fillText(txt, boardW + gap*2, y);
		txt = players[i].score + " points";
		board.fillText(txt, boardW + gap*4, y + gap);
		y += gap*2;
	}
}

function grid() {
	//board.beginPath();
	board.fillStyle = "grey";
	for (let i=0;i<16;i++){
		//Vertical grid lines
		//board.moveTo(i*HorizSpacing, 0);
		//board.lineTo(i*HorizSpacing, boardH);
		board.fillRect(i*HorizSpacing,0,1,boardH);
		//Horizontal grid lines
		//board.moveTo(0, i*VertSpacing);
		//board.lineTo(boardW, i*VertSpacing);
		board.fillRect(0,i*VertSpacing,boardW,1);

	}
	//board.stroke();
}
function colorPicker(input) {
	switch (input) {
		case 1: board.fillStyle = "#33B3A0"; break; // teal (DL)
		case 3: board.fillStyle = "#ECAC73"; break; // orange (DW)
		case 2: board.fillStyle = "#47A8DA"; break; //cyan-ish (TL)
		case 4: board.fillStyle = "#D273EC"; break; //magenta (TW)
		default: board.fillStyle = "#000000"; //black (error)
	}
}
function randomized() {
	board.clearRect(0,0,boardW,boardH);
	resetColored();
	let p;
	for (let i=0; i<8;i++){
		for (let j=0; j<8;j++) {
			p = Math.random();
			if(p>0.85){
				p=Math.ceil(Math.random()*4); // ints 1-4
				colorPicker(p); //color bins @ 1,2,3,4
				colored[i][j]=p;
				board.fillRect(j*HorizSpacing+1,i*VertSpacing+1,tileW,tileH);
			}
		}
	}
	mirr();
}
function mirr(){
	board.clearRect(HorizSpacing*8,0,boardW-(HorizSpacing*8), boardH);
	board.clearRect(0,VertSpacing*8,boardW,boardH-(VertSpacing*8));

	//mirror on Q1
	for (let i=8; i<15;i++){
		for (let j=0; j<8;j++){
			if(colored[i-8][j]){
				colorPicker(colored[i-8][j]); //color bins @ 1,2,3,4
				colored[22-i][j] = colored[i-8][j];
				board.fillRect(j*HorizSpacing+1,(22-i)*VertSpacing+1,tileW,tileH);
			}
		}
	}

	//mirror on Q3
	for (let i=0; i<8;i++){
		for (let j=8; j<15;j++){
			if(colored[i][j-8]){
				colorPicker(colored[i][j-8]); //color bins @ 1,2,3,4
				colored[i][22-j] = colored[i][j-8];
				board.fillRect((22-j)*HorizSpacing+1,i*VertSpacing+1,tileW,tileH);
			}
		}
	}

	//mirror on Q4
	for (let i=8; i<15;i++){
		for (let j=8; j<15;j++){
			if(colored[i-8][j-8]){
				colorPicker(colored[i-8][j-8]); //color bins @ 1,2,3,4
				colored[22-i][22-j] = colored[i-8][j-8];
				board.fillRect((22-j)*HorizSpacing+1,(22-i)*VertSpacing+1,tileW,tileH);
			}
		}
	}
	grid();
	legend();
}

function classic() {
	//draws classic board
	board.clearRect(0,0,boardW,boardH);
	resetColored();

	//initialize colored array
	// 1 for DL
	// 2 for TL
	// 3 for DW
	// 4 for TW

	colored[0][0] = 4;
	colored[5][5] = 2;
	colored[6][6] = 1;
	colored[3][0] = 1;
	colored[0][3] = 1;
	colored[7][0] = 4;
	colored[0][7] = 4;
	colored[5][1] = 2;
	colored[1][5] = 2;
	colored[6][2] = 1;
	colored[2][6] = 1;
	colored[7][3] = 1;
	colored[3][7] = 1;

	for (let i=0; i<8;i++){
		for (let j=0; j<8;j++) {
			if(i==j&&!(colored[i][j]))
				colored[i][j]=3;
			if(colored[i][j]){
				colorPicker(colored[i][j]);
				board.fillRect(j*HorizSpacing+1,i*VertSpacing+1,tileW,tileH);
			}
		}
	}
	mirr();
}