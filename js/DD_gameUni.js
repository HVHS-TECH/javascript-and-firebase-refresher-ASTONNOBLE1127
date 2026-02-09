/******************************************************/
// 
// gameUni.js
// 
// This file contains the universal functions and variables that are used in the game
//
//written by Aston Noble term 1 2025
//
/******************************************************/

console.log("%c gameUni.js", "color: blue; background-color: white;");

/******************************************************/
//preload() 
// loads the images
/******************************************************/

function preload() {
    playerSheet = loadImage('/images/questKid.webp');
    wolfSheet = loadImage('/images/enemy/MassacreSpriteSheet.png');
    archerSheet = loadImage('/images/enemy/archer.png');
    arrowSheet = loadImage('/images/enemy/arrow.png');
    tiles = loadImage('/images/DungeonTileSet.png')
    heart = loadImage('/images/icons/heart.png')
    keyboard = loadImage('/images/uninteractables/keybinds.png')
    endScreen = loadImage('/images/uninteractables/end2.png')
    menu = loadImage('/images/buttons/menu.png')
    restart = loadImage('/images/buttons/restart.png')
    letter = loadImage('/images/uninteractables/lettersheet2.png')
    starImg = loadImage('/images/icons/star3.png')
    startImage = loadImage('/images/buttons/start.png')
    tutorialImage = loadImage('/images/buttons/tutorial.png')
    ttasr = loadImage('/images/buttons/ttasr.png')
    golemSheet = loadImage('/images/enemy/golem.png')
    lock = loadImage('/images/icons/lock.png')
    levelImg = loadImage('/images/icons/levels.png')
    planeImg = loadImage('/images/plane/ships_packed.png')
    planeTiles = loadImage('/images/plane/tiles_packed.png')
    heartRelic = loadImage('/images/relics/heartRelic.png')
    backImg = loadImage('/images/buttons/back.png')
    titleImg = loadImage('/images/title.png')
}


/******************************************************/
//variables & constants
/******************************************************/

//setup 
var gameState = 'start'
var canvasHeight //this cant be a constant as it would destroy everything
var level
var bgC = "green"
const DOORPOINT = [55,3,10.5,21,2.5,3,100,100]
const PLAYERPOINT = [3,12,3.5,26,10.5,38,2,0]
const RELICPOINT = [58,3.5,100,25,4,16.5]
var StandradRatio

//player
var jumping = false
var stabbing = false
var spiked = false
var cooldown = false
let hops = true
var xVel = 0
var health
let playerDamage = 1
let hearts = []

//enemies
var wolfAtking = false
var golemAtking = false
var Atking = false
var Anim = false
var enemyCount = 0
var enemy = []
var project = []
var shoot = false
var direction = 1
const WOLFSPAWN = ['045009','005040008040010009016009080001','009030','']
const GOLEMSPAWN = ['','070035005009075001','003043024002019002013023019023','']
const ARCHERSPAWN = ['','','004002048014048008','']
var wolfCount
var golemCount
var archerCount
var EnemyCount = []
let golAni = false
let wolfAni = false
var activeArrow = 0

//scoring
var artifactFound
var win
var star = []
var scoreTotal = [0,0,0,0,0,0,0,0,0,0]
const TEXTARRAY = ['you lose', 'you win','dungeon', 'divers']

//tracking
var heartCount = 0
var textScale



/******************************************************/
//uni()
//universal setup
//defines tiles and groups
//called by setup()
/******************************************************/

function uni() {
    //groups
    deletes = new Group()
    bricks = new deletes.Group()
    spikes = new deletes.Group()
    climb = new deletes.Group()
    enemys = new Group()
    player =  new Group()
    words = new deletes.Group()
    tutor = new deletes.Group()
    ranged = new enemys.Group()
    projectil = new enemys.Group()


    //tiles
    hopBlock = new deletes.Group(); hopBlock.tile = '`'; hopBlock.h = 10;
    hopBlock.w = 10; hopBlock.collider = 'n'; 
    const BRICK1 = new tiled(1, 's',{w:16, h:16, col:1, row:1})
    const BRICK2 = new tiled(2, 's',{w:16, h:16, col:2, row:1});
    const BRICK3 = new tiled(3, 's',{w:16, h:16, col:3, row:1})
    const BRICK4 = new tiled(4, 's',{w:16, h:16, col:1, row:2});
    const BRICK5 = new tiled(5, 's',{w:16, h:16, col:2, row:2})
    const BRICK6 = new tiled(6, 's',{w:16, h:16, col:3, row:2});
    const BRICK7 = new tiled(7, 's',{w:16, h:16, col:1, row:3})
    const BRICK8 = new tiled(8, 's',{w:16, h:16, col:2, row:3});
    const BRICK9 = new tiled(9, 's',{w:16, h:16, col:3, row:3})
    const STAIR1 = new tiled('/', 's',{w:16, h:16, col:5, row:1})
    const STAIR2 = new tiled('|', 's',{w:16, h:16, col:6, row:1})
    const BRICK10 = new tiled('-', 's',{w:16, h:16, col:5, row:2})
    const BRICK11 = new tiled('=', 's',{w:16, h:16, col:6, row:2})
    const BRICK12 = new tiled('_', 's',{w:16, h:16, col:5, row:3})
    const BRICK13 = new tiled('+', 's',{w:16, h:16, col:6, row:3})
    const spike1 = new spikey('^', 'n',{w:16, h:16, col:1, row:14})
    const LADDER0 = new climbs('!', 'n',{w:16, h:16, col:5, row:8})
    const LADDER1 = new climbs('q', 'n',{w:16, h:16, col:5, row:9})
    const LADDER2 = new climbs('a', 'n',{w:16, h:16, col:5, row:10})
    const LADDER3 = new climbs('z', 'n',{w:16, h:16, col:5, row:11})
    const CAGE3 = new tiled('b', 'n',{w:16, h:16, col:7, row:12})
    const CAGE6 = new tiled('n', 'n',{w:16, h:16, col:7, row:13})
    const CAGE1 = new tiled('y', 'n',{w:16, h:16, col:8, row:12})
    const CAGE2 = new tiled('h', 'n',{w:16, h:16, col:8, row:13})
    const CAGE4 = new tiled('u', 'n',{w:16, h:16, col:9, row:12})
    const CAGE5 = new tiled('j', 'n',{w:16, h:16, col:9, row:13})
    const CHAIN = new tiled('?', 'n',{w:16, h:16, col:2, row:12})
    const INVS = new tiled('~', 's',{w:16, h:16, col:0, row:12})
    const RAIL1 = new climbs('*', 'n',{w:16, h:16, col:1, row:9})
    const RAIL2 = new climbs('(', 'n',{w:16, h:16, col:2, row:9})
    const RAIL3 = new climbs(')', 's',{w:16, h:16, col:3, row:9})

}


/******************************************************/
//gameuni()
//universal level setup
/******************************************************/

function gameuni() {
    //setting variables
    EShoot(enemy[20],player[0],project[0],0) //presets an a projectile
    shoot = false
    artifactFound = false
    win = false
    health = 10
    bgC = '#181425'
    EnemyCount = []
    wolfCount = WOLFSPAWN[level].length/6
    golemCount = GOLEMSPAWN[level].length/6
    archerCount = ARCHERSPAWN[level].length/6
    enemyCount = golemCount + wolfCount + archerCount

    //enemys
    enemyMaker()

    //all sprites fixing
    spriteFixing()

    //healthbar for player
    healthbarMaker()

    //player
    playerMaker()

    //door
    doorMaker()

    //endscreen
    endscreenMaker()

    //endscreen buttons
    endscreenButtonsMaker()

    //stars
    starMaker()
}

/******************************************************/
//
//functions
//
/******************************************************/



/******************************************************/
//enemy spawning
//
/******************************************************/

/******************************************************/
//enemyMaker()
//spawns the enemies
/******************************************************/

function enemyMaker() {
    for (let i = 0; i < golemCount; i++) {
        EnemyCount[EnemyCount.length] = i
    }
    for (let i = 0; i < wolfCount; i++) {
        EnemyCount[EnemyCount.length] = i + 10
    }
    for (let i = 0; i < archerCount; i++) {
        EnemyCount[EnemyCount.length] = i + 20
    }
    let enemySpawn = GOLEMSPAWN[level] + WOLFSPAWN[level] + ARCHERSPAWN[level]
    for (let i = 0; i < EnemyCount.length; i++) {
        let track = enemySpawn.slice(i * 6, i * 6 + 3)
        track = Number(track)
        let track2 = enemySpawn.slice(i * 6 + 3, i * 6 + 6)
        track2 = Number(track2)
        enemy[EnemyCount[i]].vel.y = 0.1
        enemy[EnemyCount[i]].health = enemy[EnemyCount[i]].maxHealth
        enemy[EnemyCount[i]].x = track * StandradRatio
        enemy[EnemyCount[i]].y = track2 * StandradRatio
        enemy[EnemyCount[i]].collider = 'd'
    }
}

/******************************************************/
//spriteFixing()
//makes the sprites ready for the next level
/******************************************************/

function spriteFixing() {
    tilesGroup.scale = StandradRatio/16 
    allSprites.rotationLock = true
    allSprites.pixelPerfect = true;
    allSprites.autoCull = false
    allSprites.opacity = 1
    hopBlock.opacity = 0
}

/******************************************************/
//healthbarMaker()
//makes the healthbar for the player
/******************************************************/

function healthbarMaker() {
    heartCount = health/2
    for (let i = 0; i < heartCount; i++) {
        hearts[i] = new deletes.Sprite(7,7,7,7,'n')
        hearts[i].image = (heart)
        hearts[i].scale = (canvasHeight/194)
    }
}

/******************************************************/
//playerMaker()
//makes the player
/******************************************************/

function playerMaker() {
    player.x = PLAYERPOINT[level*2] * StandradRatio
    player.y = PLAYERPOINT[level*2+1] * StandradRatio
    player.collider = 'd'
    player.rotationLock = true
    player.friction = 0
}
                                             
/******************************************************/
//doorMaker()
//makes the door
/******************************************************/

function doorMaker() {
    door = new deletes.Sprite(StandradRatio* DOORPOINT[level*2],StandradRatio* DOORPOINT[level*2+1],16,32,'n')
    door.spriteSheet = tiles
    door.addAnis({
        closed:{w:16, h:32, col:13, row:5},
        open:{w:16, h:32, col:12, row:5}
    })
    door.changeAni('closed')
    door.scale = (StandradRatio/16)
}

/******************************************************/
//endscreenMaker()
//makes the endscreen
/******************************************************/

function endscreenMaker() {
    ends = new deletes.Sprite(0,0,78,96,'n')
    ends.image = (endScreen)
    ends.scale = StandradRatio/8
    ends.opacity = 0
}

/******************************************************/
//endscreenButtonsMaker()
//makes the buttons for the endscreen
/******************************************************/

function endscreenButtonsMaker() {
    menuButton = new deletes.Sprite(camera.x + (canvasHeight/5),10000000000,15,15,'k')
    menuButton.image = menu
    menuButton.scale = StandradRatio/8
    menuButton.opacity = 0 
    
    restartButton = new deletes.Sprite(camera.x - (canvasHeight/5),1000000000,15,15,'k')
    restartButton.image = restart
    restartButton.scale = StandradRatio/8
    restartButton.opacity = 0
}

/******************************************************/
//starMaker()
//makes the stars
/******************************************************/

function starMaker() {
    for (let i = 0; i < 3; i++) {
        star[i] = new deletes.Sprite(1000000000000,1,15,14,'n');
        star[i].opacity = 0; 
        star[i].scale = canvasHeight/120; 
        star[i].image = starImg;
    }
}



/******************************************************/
//gameloop functions
//
/******************************************************/

/******************************************************/
//updateHealth()
//updates the healthbar
/******************************************************/

function updateHealth() {
    for (let i = heartCount-1; i > -1; i--) {
        hearts[i].opacity = health/2 - i
        if (hearts[i].opacity < 0) {hearts[i].opacity = 0}
    }
}

/******************************************************/
//endScreen
/******************************************************/

/******************************************************/
//won()
//runs on player win
/******************************************************/

 function won() {
    xVel = 0
    player.vel.x = 0
    player.vel.y = 0
    player.collider = 'n'
    finish(TEXTARRAY[1])
 }

/******************************************************/
//finish(textTrack)
//runs on level finish
//input TEXTARRAY
/******************************************************/

 async function finish(textTrack) {
    await delay(2000)
    player.vel.x = 0; 
    player.collider = 'n'
    ends.x = camera.x
    ends.y = camera.y
    allSprites.opacity = 0.5
    hopBlock.opacity = 0
    ends.opacity = 1
    textScale = (canvasHeight/100)
    let yOffset = -StandradRatio
    textMaker(textTrack, yOffset)
    menuButton.x = camera.x + (canvasHeight/5)
    menuButton.y = camera.y + StandradRatio * 4
    restartButton.x = camera.x - (canvasHeight/5)
    restartButton.y = camera.y + StandradRatio * 4
    menuButton.opacity = 1
    restartButton.opacity = 1
    let stars = 0
    if (win == true) {
        stars++
        star[0].opacity = 1
        star[0].x = camera.x
        star[0].y = camera.y - canvasHeight/3.5
            if (enemyCount == 0 || artifactFound == true) {
                stars++
                star[1].x = camera.x - canvasHeight/7.5
                star[1].y = camera.y - canvasHeight/4.5
                star[1].opacity = 1
            }
            if (enemyCount == 0 && artifactFound == true) {
                stars++
                star[2].x = camera.x + canvasHeight/7.5
                star[2].y = camera.y - canvasHeight/4.5
                star[2].opacity = 1
            }
    }
    
    
    let result = await updateScore(stars,level)
    if (stars > scoreTotal[level]) {
        scoreTotal[level] = stars
    }
}

/******************************************************/
//healthbar()
//updates the healthbar position
/******************************************************/

function healthbar() {
    for (let i = 0; i < health/2; i++) {
        hearts[i].x = camera.x - (canvasHeight/2.5) + (i * 8 * (canvasHeight/194))
        hearts[i].y = camera.y - (canvasHeight/2.5)
    }
}

/******************************************************/
//textMaker(textTrack, yOffset)
//makes the text
//input  TEXTARRAY , yOffset
/******************************************************/

function textMaker(textTrack, yOffset) {
	let back = 0
	let front = 1
	let pos = 0
	for (let i = 0; i < (textTrack.length); i++) {
		let track = textTrack.slice(back, front)
		track = track.charCodeAt(0) - 96
        track = Number(track)
		pos += 2
		back += 1
		front += 1
        tex = new words.Sprite(pos * (canvasHeight/32) - ((textTrack.length+1)/2 * 
            StandradRatio) +  camera.x,camera.y + yOffset, 7, 7, 'n');
        tex.spriteSheet = letter
        tex.addAni({w:9, h:7, row:0, col:track })
        tex.scale = textScale
    }
}
