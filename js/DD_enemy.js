/**********************************************************/
//
//  enemys.js
//
//written by Aston Noble term 1 2025
//
//functions for the enemies
//enemy template class
//
/**********************************************************/

//enemy template
class Enemy {
    constructor(spriteImg,HP,DMG,Scale,w,h,anis,Type,offsetY,trigdist,atkdist,del,xInvert) {
        this.name = new enemys.Sprite(-80000,432)
        this.name.spriteSheet = spriteImg
        this.name.maxHealth = HP
        this.name.health = HP
        this.name.dmg = DMG
        this.name.w = w
        this.name.h = h
        this.name.addAnis(anis)
        this.name.del = del
        enemy.push(this.name)
        this.name.anis.offset.y = offsetY
        this.name.changeAni('idle')
        this.name.scale = Scale
        this.name.scal = Scale * xInvert
        this.name.scale.x = Scale * xInvert
        this.name.type = Type
        this.name.rotationLock = true
        this.name.collider = 'n'
        this.name.trigdist = trigdist
        this.name.atkdist = atkdist
    }
}

// ranged enemy extension
class Ranged extends Enemy {
    constructor(spriteImg,HP,DMG,Scale,w,h,anis,Type,offsetY,trigdist,atkdist,del,xInvert,minRange,child) {
        super(spriteImg,HP,DMG,Scale,w,h,anis,Type,offsetY,trigdist,atkdist,del,xInvert)
        this.name.minRange = minRange
        this.name.child = child
    }
}

//projectiles
class Projectiles {
    constructor(arc,spd,w,h,parent,scale,img,dmg) {
        this.name = new projectil.Sprite(-80000,432,w,h,'n')
        this.name.arc = arc
        this.name.spd = spd
        this.parent = parent
        this.name.image = (img)
        this.scale = scale
        project.push(this.name)
        this.name.dmg = dmg
    }
}

/******************************************************/
//enemys functions
/******************************************************/

/******************************************************/
//EDeath(enemy)
//makes the enemy die
//input array of enemys
//output(N/A)
/******************************************************/

async function EDeath(enemy) {
    await enemy.changeAni('hurt')
    await enemy.changeAni('death')
    enemy.x = 1000000
    enemy.collider = 'n'
    enemyCount--
    health++
    updateHealth()
}

/******************************************************/
//EAtk(enemy)
//makes the enemy attack
//input array of enemys
//output(N/A)
/******************************************************/

async function EAtk(enemy,player) {
    Atking = true
    Anim = true
    await enemy.changeAni('attack')
    enemy.changeAni('idle')

    if (enemy.overlapping(player) && enemy.health > 0) {
        health-= enemy.dmg
    } else {console.log('no')}
    updateHealth()
    Anim = false
    await delay(enemy.del * 100)
    Atking = false
}

/******************************************************/
//EHurt()
//run on enemy hurt
//input(enemy)
//output(N/A)
/******************************************************/

async function EHurt(enemy) {
    enemy.health-= playerDamage
    if (enemy.health > 0 && Anim == false) {
        await enemy.changeAni('hurt'); 
        enemy.changeAni('idle');
    }
    if (enemy.health <= 0) {
        EDeath(enemy);
    }
}

/******************************************************/
//ERun(enemy,player)
//makes the enemy run
//input array of enemys and the player
//output(N/A)
/******************************************************/

async function ERun(enemy, player) {
    if (player.x > enemy.x) {
        direction = 1; 
    } else if (player.x < enemy.x) { 
        direction = -1;    
    }
    enemy.scale.x = enemy.scal * direction
    enemy.vel.x = (direction * (canvasHeight/288))
    await enemy.changeAni('run')
    enemy.changeAni('idle')
}

/******************************************************/
//EShoot(enemy,player,projectile)
//makes enemy shoot
//input array of enemys and the player and the projectile
/******************************************************/

async function EShoot(enemy,player,projectile,arrow) {
    shoot = true
    if (player.x > enemy.x) {
        direction = 1; 
    } else if (player.x < enemy.x) { 
        direction = -1;    
    }
    await enemy.changeAni('ranged')
    enemy.changeAni('idle')
    projectile.x = enemy.x
    projectile.y = enemy.y
    projectile.txp = player.x - enemy.x
    projectile.ya = projectile.txp
    if (projectile.ya < 0) {
        projectile.ya = projectile.ya * -1
    }
    projectile.typ = player.y - enemy.y - projectile.ya
    activeArrow = arrow
    projectile.rotateMinTo(player,90)
    await delay(3000)
    shoot = false
}

/******************************************************/
//proDmg(projectil)
//damages player
//input projectil
/******************************************************/

function proDmg(projectil) {
    proKill(projectil)
    health-= projectil.dmg
    updateHealth()
}


/******************************************************/
//proKill(projectil)
//kills the arrow
//input projectil
/******************************************************/

function proKill(projectil) {
    projectil.x = -180000
}

/******************************************************/
//canAtk(enemy)
//both the player and enemy able to attack(melee)
//input array of enemys and the player
/******************************************************/
 
function canAtk(player, enemy) {
    if (Atking == false && enemy.health > 0) {
        console.log('tim')
        Atking = true
        EAtk(enemy,player)
    }
    if (stabbing == false) {
        if (mouse.presses()) {
            EHurt(enemy)
            PAtk(player)
        }
    }
}
