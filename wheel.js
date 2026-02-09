var wheelrot = 0
var WhScore = 0
document.getElementById("wheel").addEventListener('click', async () => {
    wheelrot++
    WhScore++
    document.getElementById("wheel").style.scale = "1.1 1.1"
    document.getElementById("wheel").style.rotate = (wheelrot + "deg")
    await new Promise(r => setTimeout(r, 50));
    document.getElementById("wheel").style.scale = "1 1"
    document.getElementById("wheelScore").innerHTML = WhScore
})
document.getElementById("submitscore").addEventListener('click', async () => {
    wheelUpdate(WhScore)
})