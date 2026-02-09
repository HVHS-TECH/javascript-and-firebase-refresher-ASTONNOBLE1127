/********************************************* */
//
// PLANE GAME
//
//written partially by Aston Noble term 1 2025
//
//experimental code
//
/********************************************* */
const NLEVEL = 200
const NSCALE = 0.01
let bullet, gem;
let y = 0
var firing = false
var mode = 0
var cameraTrack
function planes() {
    bullet = new Sprite(0, 0, 16, 16, 'n')
    bullet.remove()
    firing == false
    plane = new Sprite(canvasHeight/2, canvasHeight/10 * 9, 32, 32, 'n')
    plane.spriteSheet = planeImg
    plane.addAnis({
        2: {w:32,h:32,row:0,col:0},
        0: {w:32,h:32,row:1,col:0},
        1: {w:32,h:32,row:2,col:0}
})
    plane.scale = canvasHeight/400
    plane.changeAni('0')

    world.gravity = 0
    
    gem = new Group();
	gem.diameter = 10;
	gem.x = () => random(0, canvas.w);
	gem.y = () => random(0, canvas.h);
	gem.amount = 300;

 for ( y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
        let nx = NSCALE * x;
        let ny = NSCALE * y;

      let c = NLEVEL * noise(nx, ny);
      til = new Sprite(x * canvasHeight/16 + canvasHeight/32, y * canvasHeight/16 + canvasHeight/32, canvasHeight/16, canvasHeight/16, 'n')
      //til.spriteSheet = planeTiles
      //til.addAni({w:canvasHeight/16,h:canvasHeight/16,row:0,col:round(c)})
      console.log('y='+ y + ' ' + round(c))
      til.color = ('#' + round(c) + round(c))
      til.text = round(c)
      til.layer = 0
        }
    }
    cameraTrack = camera.y
    y = 0
}


function collect(bullet, gem) {
	gem.remove();
    bullet.health -= 1
    if (bullet.health == 0) {
        bullet.remove()
    };

}


function planeRun() {
    background(bgC)
    if (kb.presses('e')) {
        allSprites.remove()
        tonkers()
        gameState = 'tonk'
    }
    //console.log(camera.y)
    camera.y--
    plane.y--
    if (cameraTrack - canvasHeight/16 >= camera.y) {
        cameraTrack = camera.y
        for (let x = 0; x < 16; x++) {
            let nx = NSCALE * x;
            let ny = NSCALE * y;
            console.log(cameraTrack)
          let c = NLEVEL * noise(nx, ny);
          til = new Sprite(x * canvasHeight/16 + canvasHeight/32, y * canvasHeight/16 + canvasHeight/32, canvasHeight/16, canvasHeight/16, 'n')
          //til.spriteSheet = planeTiles
          //til.addAni({w:canvasHeight/16,h:canvasHeight/16,row:0,col:round(c)})
          //console.log('y='+ y + ' ' + round(c))
          til.color = ('#' + round(c) + round(c))
          til.text = round(c)
          til.layer = 0
            }
            y--
    }
	bullet.colliding(gem, collect);
    if (kb.pressing('w')) {
        plane.y -= 3
    } else if (kb.pressing('s')) {
        plane.y += 3
    }
    if (kb.pressing('a')) {
        plane.x -= 3
        plane.scale.x = canvasHeight/512
    } else if (kb.pressing('d')) {
        plane.x += 3
        plane.scale.x = canvasHeight/512
    }
    if (kb.pressing('space') && firing == false) {
        fire()
        bullet = new Sprite(plane.x, plane.y, 16, 'd')
        bullet.vel.y = -5
        if (mode == 2) {
            bullet.vel.y = -10
        }
        bullet.health = mode + 1
        bullet.rotationLock = true
        bullet.spriteSheet = planeTiles
        bullet.addAni({w:16,h:16,row:0,col:mode})
        bullet.scale = canvasHeight/1000
    }
    if (kb.pressing('1')) {
        mode = 0
        plane.changeAni('0')
    } else if (kb.pressing('2')) {
        mode = 1
        plane.changeAni('1')
    } else if (kb.pressing('3')) {
        mode = 2
        plane.changeAni('2')
    }
}

async function fire() {
    firing = true
    await delay((mode + 1) * 300)
    firing = false
}