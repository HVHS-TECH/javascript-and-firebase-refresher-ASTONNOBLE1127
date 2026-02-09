/**********************************************************/
//
//  Class.js
//
//written by Aston Noble term 1 2025
//
//precreates the tiles for the game
//
/**********************************************************/

//climbable tiles
class climbs {
    constructor(tile, colider, animation) {
        this.name = new climb.Group()
        this.name.tile = tile;
        this.name.spriteSheet = tiles
        this.name.collider = colider
        this.name.addAni(animation)
        this.name.h = 14
    }
}
//normal tiles
class tiled {
    constructor(tile, colider, animation) {
        this.name = new bricks.Group()
        this.name.tile = tile;
        this.name.spriteSheet = tiles
        this.name.collider = colider
        this.name.addAni(animation)
    }
}
//damage tiles
class spikey {
    constructor(tile, colider, animation) {
        this.name = new spikes.Group()
        this.name.tile = tile;
        this.name.spriteSheet = tiles
        this.name.collider = colider
        this.name.addAni(animation)
        this.name.h = 14
    }
}

