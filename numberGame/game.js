/*****************
     Varibles
 * ***************/

var mystery;
var won = 1;
var guess;
var attemps = (localStorage.getItem("tries"));
var guess;

/**********************
 * setup
 * *****************/
 
 function gamepagesetup() {
const maxnum = ["20","100","200"]
         document.getElementById("trys").innerHTML = ("you have "+ (localStorage.getItem("tries")) +" attempts left");
         document.getElementById("instruct").innerHTML = ("Enter a number between 1 and "+ (maxnum[localStorage.getItem("seter")]) +":");
   mystery = Math.ceil(Math.random() * (maxnum[localStorage.getItem("seter")]));// sets a random number with the difficulty 
 }
 
/*****************
     submit button
 * ***************/
  document.getElementById("subutton2").addEventListener("click", submit2);
 
 function submit2() {
    const maxnum = ["20","100","200"]
    guess =  (document.getElementById("guessbox").value);
    guess = Number(guess)
    if (guess == mystery) { // if the player wins
          won = 2;
    } else if (guess < 1 || (guess > maxnum[localStorage.getItem("seter")])) {
                              document.getElementById("wrongguess").innerHTML = ("Please enter a number between 1 and " + maxnum[localStorage.getItem("seter")]);
                 document.getElementById("trys").innerHTML = ("you have "+ attemps +" attempts left");
        } else if (guess < mystery) { //if guess lower than mystery number
                          document.getElementById("wrongguess").innerHTML = ("Too low");
                          attemps = attemps - 1
                                           document.getElementById("trys").innerHTML = ("you have "+ attemps +" attempts left");
} else if (guess > mystery) { //if guess higher than mystery number
                      document.getElementById("wrongguess").innerHTML = ("Too high");
                                                attemps = attemps - 1
                                           document.getElementById("trys").innerHTML = ("you have "+ attemps +" attempts left");
    }
    
    if (won == 2) {
window.location.replace("end.html")
  localStorage.setItem("attemps",attemps);
  localStorage.setItem("won",won);
    }
    if (attemps <= 0) {
window.location.replace("end.html")
  localStorage.setItem("won",won);
    localStorage.setItem("guess",guess);
      localStorage.setItem("mystery",mystery);

    }
       }