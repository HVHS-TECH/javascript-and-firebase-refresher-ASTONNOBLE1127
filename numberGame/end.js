function endpagesetup() { //shows "you win"/"you lose"
var won = localStorage.getItem("won")
if (won == 2) {
             document.getElementById("winner").innerHTML = ("You Won");
} else if (won == 1) {
    document.getElementById("winner").innerHTML = ("You Lose");
}
}

/****buttons****/
   document.getElementById("replay").addEventListener("click", replay);
  document.getElementById("restart").addEventListener("click", restart);

/*
* replay()
* Called by the "play again" button
*
* sends back to game page
*/
function replay() {
    window.location.replace("game.html")
}

/*
* restart()
* Called by the "edit details" button
*
* sends back to details page
*/
function restart() {
    window.location.replace("details.html")
}