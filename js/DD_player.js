/**********************************************************/
//
//  player.js
//
//written by Aston Noble term 1 2025
//
/**********************************************************/

class players {
    constructor(spriteImg,HP,DMG,Scale,w,h,anis,offsetX,offsetY,del) {
        this.name = new player.Sprite(-1000000,100)
        this.name.spriteSheet = spriteImg
        this.name.health = HP
        this.name.dmg = DMG
        this.name.w = w
        this.name.h = h
        this.name.addAnis(anis)
        this.name.changeAni('idle')
        this.name.anis.offset.y = offsetY
        this.name.anis.offset.x = offsetX
        this.name.del = del
        this.name.scale = Scale
        this.name.collider = 'n'
        this.name.friction = 0
    }
} 

/******************************************************/
//player functions
/******************************************************/

/******************************************************/
//PAtk()
//makes the Player attack
//input(player)
//output(N/A)
/******************************************************/

async function PAtk(player) {
    stabbing = true
    cooldown = true
    if (level == 0) {
        if (player.overlapping(chest)) {
            chest.changeAni('opened'); 
            artifactFound = true
        }
    }
    await player.changeAni('stab')
    player.changeAni('idle')
    cooldown = false
    await delay(500)
    stabbing = false
}

/******************************************************/
//death(player)
//runs on player death
//input player
/******************************************************/

async function death(player) {
    xVel = 0
    player.vel.x = 0
    player.vel.y = 0
    player.collider = 'n'
    await player.changeAni('death')
    player.changeAni('dead')
    finish(TEXTARRAY[0])
}

/******************************************************/
//movement
/******************************************************/

/******************************************************/
//walkWest(player)
//makes the player walk west
//input player
/******************************************************/

async function walkWest(player) {
    player.scale.x = -(canvasHeight/256);
    if (cooldown == false) {
        await player.changeAni('walk')
        player.changeAni('idle')
    }
}

/******************************************************/
//walkEast(player)
//makes the player walk east
//input player
/******************************************************/

async function walkEast(player) {
    player.scale.x = (canvasHeight/256);
    if (cooldown == false) {
        await player.changeAni('walk')
        player.changeAni('idle')
    }
}

/******************************************************/
//jump(player)
//makes the player jump
//input player
/******************************************************/

async function jump(player) {
    jumping = true
    await player.changeAni('jump')
    player.changeAni('idle')
    await delay(2600)
    jumping = false
}

/******************************************************/
//climbing(player)
//makes the player climb
//input player
/******************************************************/

async function climbing(player) {
    await player.changeAni('climb')
    player.changeAni('clim')
}