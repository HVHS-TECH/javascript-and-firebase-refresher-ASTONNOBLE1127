document.getElementById("start").addEventListener("click", start); //runs start function

function start() { //takes user to details page
    window.location.replace("details.html")
}
for (let count = 0; count <= 10; count++) {
    console.log("I know how to do a for loop this will repeat ", (10 - count), " more times")
}