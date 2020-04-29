/*
Displays and closes all messages shown for the game, including but not limited to:
	Player creation (entering number of players and player names)
	Turn notifications
	Invalid play notifications
	Pass turn notifications
	Play sumbission notification (word list, turn score and option to challege)
	Challenge outcome (challenge succeeded or failed and consequences)
*/
let textBoxContent;
let button = document.getElementById("messageButton");
let msg = document.getElementById("message");
let shade = document.getElementById("shade");
let msgBox = document.getElementById("messageBox");


function openMsgBox(message, callback = grid) {
	msg.innerHTML = message;
	button.innerHTML = "OK";
	shade.classList.add("active");
	msgBox.classList.add("active");
	button.onclick = function() { closeMsgBox(callback); }
}

function closeMsgBox(callback) {
	shade.classList.remove("active");
	msgBox.classList.remove("active");
	callback();
}

function openMsgBoxInput(message, callback = recordInput) {
	let text = message + `<br/><input id="inputBox" placeholder="type here">`;
	msg.innerHTML = text;
	button.innerHTML = "Submit";
	shade.classList.add("active");
	msgBox.classList.add("active");
	button.onclick = function() { closeMsgBox(callback); }
}

function recordInput() {
	textBoxContent = document.getElementById("inputBox").value;
}