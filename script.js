
function chezz() {
    document.getElementById("welcomeMessage").innerHTML = document.getElementById("chex").value;
    console.log(document.getElementById("chex").value)
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("chez").addEventListener("click", chezz)
})