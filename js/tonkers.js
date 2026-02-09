/********************************************* */
//
// tonk GAME
//
//written partially by Aston Noble term 1 2025
//
//experimental code
//
/********************************************* */
var terrain = []

function tonkers() {
    world.gravity.y = 9.8
    for (let x = 0; x < canvasHeight; x++) {
        terrain[x] = noise(x * 0.006) * 200
        console.log(terrain[x])
        floor = new Sprite(x,terrain[x],1,'k')
    }
    tim = new Sprite(5,5,5,'d')
        
    }


function tonkRun() {
    clear()
    if (kb.pressing('d') && tim.vel.x < 2) {
        tim.vel.x+= 0.2
    } else if (kb.pressing('a') && tim.vel.x > -2) {
        tim.vel.x-= 0.6
    }
}