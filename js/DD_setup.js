/******************************************************/
// 
// setup.js
// 
//runs setup() and draw() functions
//
//written by Aston Noble term 1 2025
//
/******************************************************/


/***********************************************************/
//setup()
/***********************************************************/

function setup() {
    canvasHeight = (16 * Math.floor(windowHeight / 16 - 1));
    StandradRatio = (canvasHeight/16)
    cnv = new Canvas(canvasHeight, canvasHeight);
    world.gravity.y = (canvasHeight/57.6);
    allSprites.autoCull = false
    uni()
    startScreen()
    
    updateScore(0,0)

    var enemySet = []
    //defines the golems
    for (let i = 0; i < 10; i++) {
      enemySet[i] = new Enemy(golemSheet, 5, 2, (canvasHeight/300), 40, 40, {
            idle: {row: 3 , frames: 8 , w:90, h:64},
            attack: {row: 0 , frames: 11 , w:90, h:64, frameDelay: 7},
            hurt: {row: 2 , frames: 4 , w:90, h:64, frameDelay: 14},
            death: {row: 1 , frames: 12 , w:90, h:64, frameDelay: 14},
            run: {row: 4 , frames: 10 , w:90, h:64}
        },'melee',-12, 250,70,1.5,1)
    }
    
    //defines the wolves
    for (let i = 10; i < 20; i++) {
        enemySet[i] = new Enemy(wolfSheet, 3, 1, (canvasHeight/530), 64, 32, {
            idle: {row: 0 , frames: 6, w:64, h:64},
            attack: {row: 1 , frames: 5, w:64, h:64},
            hurt: {row: 2 , frames: 4, w:64, h:64},
            death: {row: 3 , frames: 7, w:64, h:64, frameDelay: 14},
            run: {row: 1 , frames: 5, w:64, h:64, frameDelay: 9}
        },'melee',-16, 250,60,4,-1)
    }
    
    //defines the archer
    for (let i = 10; i < 20; i++) {
        enemySet[i] = new Ranged(archerSheet, 3, 1, (canvasHeight/384), 24, 36, {
            idle: {row: 5 , frames: 2, w:64, h:64, frameDelay: 14},
            ranged: {row: 3 , frames: 7, w:64, h:64, frameDelay: 9},
            attack: {row: 3 , frames: 7, w:64, h:64, frameDelay: 9},
            hurt: {row: 2 , frames: 4, w:64, h:64},
            death: {row: 1 , frames: 8, w:64, h:64, frameDelay: 14},
            run: {row: 0 , frames: 8, w:64, h:64, frameDelay: 9}
        },'ranged',1, 250,200,4,1,70,20)
    }

    //defines arrows
    
    for (let i = 20; i < 30; i++) {
        enemySet[i] = new Projectiles(15,30,40,5,20,(canvasHeight/384),arrowSheet,2)  
    }

    //defines the player
    player2 = new players(playerSheet,10,1,(canvasHeight/256),14,20,{
        jump: {w:32, h:32, row: 1, frames: 6, frameDelay: 10 },
        death: {w:32, h:32, row: 14, frames: 7, frameDelay: 10 },
        walk: {w:32, h:32, row: 0, frames: 8 },
        idle: { row: 1, frames: 1,w:32,h:32 },
        dead: {w:32, h:32, col:6, row:14 },
        stab: {w:32, h:32, row: 12, frames: 10 }, 
        slash: {w:32, h:32, row: 11, frames: 10 },
        swing: {w:32, h:32, row: 10, frames: 10 },
        climb: {w:32, h:32, row: 4, frames: 8, frameDelay: 10},
        clim: {w:32, h:32, col:1, row:4 }
    },2,-5,0.5)
}
/***********************************************************/
//draw()
//runs nessaceray gamestates when needed
// only one gamesate is run at a time
// gamestates are 'start', 'levels', 'game', 'plane'
/***********************************************************/

function draw() {
    clear()
    background(titleImg)
    if (gameState == 'start') {
        startSensors()
    } else if (gameState == 'levels') {
        levelSensors()
    } else if (gameState == 'game') {
        gameRun(player[0])
    } else if (gameState == 'plane') {
        planeRun()
    } else if (gameState == 'tonk') {
        tonkRun()
    }
}
