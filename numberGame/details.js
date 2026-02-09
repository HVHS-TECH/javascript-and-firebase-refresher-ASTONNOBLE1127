/*****************
     Varibles
 * ***************/
 
const difficulty = ["Easy","Medium","Hard"];
var seter = 0;
var tries = 0;
var attempts = 0;

/*****************
     submit button
 * ***************/
 

  document.getElementById("subuton1").addEventListener("click", submit1);
function submit1() {
  var name = (document.getElementById("namebox").value);
      var age = (document.getElementById("agebox").value);  
      var tries = (document.getElementById("trybox").value);
      age = Number(age)
      tries = Number(tries)
      console.log(age)
 if(isNaN(name) && 5 <= age && age <= 100 && 1 <= tries && tries <= 10) {
   localStorage.setItem("tries",tries);
     localStorage.setItem("seter",seter);
   window.location.replace("game.html")
     gamepagesetup()
     return;
 } else {
     if (!isNaN(name)) {
                  document.getElementById("wrongname").innerHTML = ("Names must include letters");
     } else {
         document.getElementById("wrongname").innerHTML = ("");
     }
     if (!( 5 <= age && age <= 100)) {
                  document.getElementById("wrongage").innerHTML = ("Enter a number between 5 and 100");
     } else {
         document.getElementById("wrongage").innerHTML = ("");
     }
     if (!(1 <= tries && tries <= 10)) {
                  document.getElementById("wrongtry").innerHTML = ("Enter a number between 1 and 10");
     } else {
         document.getElementById("wrongtry").innerHTML = ("");
 }
 }
}


/*****************
     Difficulty Button
 * ***************/
 function scroll() {
    console.log("g")
    seter = seter + 1
    if (seter == 3) {
        seter = 0
    }
    document.getElementById("dif").innerHTML = (difficulty[seter]);
}

   document.getElementById("dif").addEventListener("click", scroll);