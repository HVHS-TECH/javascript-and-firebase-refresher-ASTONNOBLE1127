/***********************************************************/
//
//start.js
//
//start screen
//
//written by Aston Noble term 1 2025
//
/***********************************************************/



/***********************************************************/
//startScreen
/***********************************************************/

function startScreen() {
    //start buttons
    startButton = new deletes.Sprite((canvasHeight)/2,(canvasHeight)/3,(canvasHeight)/6,(canvasHeight)/15,'k')
    tutorialButton = new deletes.Sprite((canvasHeight)/2,(canvasHeight)/2.4,(canvasHeight)/6,(canvasHeight)/15,'k')
    settingsButton = new deletes.Sprite((canvasHeight)/2,(canvasHeight)/2,(canvasHeight)/6,(canvasHeight)/15,'k')
    
    //start button images
    startButton.image = startImage
    tutorialButton.image = tutorialImage
    settingsButton.image = ttasr

    //start button scales
    ttasr.resize(canvasHeight/6,canvasHeight/15) 
    startImage.resize(canvasHeight/6,canvasHeight/15)
    tutorialImage.resize(canvasHeight/6,canvasHeight/15.7)

    //cleaning
    camera.x = canvasHeight/2
    camera.y = canvasHeight/2
    allSprites.pixelPerfect = true;
    noSmooth()

    //title
    textScale = (canvasHeight/100)
    let yOffset = -(canvasHeight/3)
    textMaker(TEXTARRAY[2],yOffset)
    yOffset = -(canvasHeight/4)
    textMaker(TEXTARRAY[3],yOffset)
}

/***********************************************************/
//startSensors
//start screen's sensors
/***********************************************************/

function startSensors() {
    if (startButton.mouse.presses()) {
        deletes.removeAll(); 
        levelScreen()
        noSmooth()
        gameState = "levels"
    } else if (tutorialButton.mouse.presses()) {
        deletes.removeAll(); 
        tutorial()
        gameState = "game"
    } /*else if (settingsButton.mouse.presses()) {
        deletes.removeAll(); 
        planes()
        gameState = "plane"
    } */
}