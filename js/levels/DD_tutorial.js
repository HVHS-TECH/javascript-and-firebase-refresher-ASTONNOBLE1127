/*******************************************************/
//
// tutorial.js
//
//written by Aston Noble term 1 2025
//
/*******************************************************/

/*******************************************************/
// tutorial()
// This function is used to set up the tutorial level
/*******************************************************/

function tutorial() { 
    //variable setting
    level = 0

    //demo sprites
    left = new tutor.Sprite(StandradRatio * 6,StandradRatio * 7,144,12,'n'); left.spriteSheet = keyboard; left.addAni({w:144, h:12, col:0, row:1}); 
    right = new tutor.Sprite(StandradRatio * 6,StandradRatio * 6,144,12,'n'); right.spriteSheet = keyboard; right.addAni({w:144, h:12, col:0, row:2}); 
    atk = new tutor.Sprite(StandradRatio * 36,StandradRatio * 7,144,12,'n'); atk.spriteSheet = keyboard; atk.addAni({w:144, h:12, col:0, row:6}); 
    climbed = new tutor.Sprite(StandradRatio * 55,StandradRatio * 8,144,12,'n'); climbed.spriteSheet = keyboard; climbed.addAni({w:144, h:12, col:0, row:0});
    jumps = new tutor.Sprite(StandradRatio * 16,StandradRatio * 6,144,12,'n'); jumps.spriteSheet = keyboard; jumps.addAni({w:144, h:12, col:0, row:5}); 
    fall = new tutor.Sprite(StandradRatio * 55,StandradRatio * 7,144,12,'n'); fall.spriteSheet = keyboard; fall.addAni({w:144, h:12, col:0, row:3});
    wood = new tutor.Sprite(StandradRatio * 55,StandradRatio * 9,144,12,'n'); wood.spriteSheet = keyboard; wood.addAni({w:144, h:12, col:0, row:8}); 
    tutor.scale = StandradRatio/16

    //tile builder
    tilesGroup = new Tiles(
        [
            '6                                                             4',
            '6                                                             4',
            '6                                                             4',
            '6                                                           ! 4',
            '6                                                    1222223q 4',
            '6                                                    7888889a 4',
            '6                                                           q 4',
            '6                                                           q 4',
            '6                                                           q 4',
            '6                                                          `z`4',
            '6                                                     ``   122-',
            '6            ``                  ``                   13   4555',
            '6````````````13``````   `````````13```````````````````46^^^4555',
            '=222222222222-=222223^^^122222222-=2222222222222222222-=222-555',
            '55555555555555555555=222-55555555555555555555555555555555555555',
            '555555555555555555555555555555555555555555555555555555555555555'
        ],
        (StandradRatio/2),  (StandradRatio/2),
        (StandradRatio),  (StandradRatio)
    );

    //level artifact
    chest = new deletes.Sprite(StandradRatio * RELICPOINT[level*2],StandradRatio * RELICPOINT[level*2+1],16,16,'n')
    chest.spriteSheet = tiles
    chest.addAnis({
        closed:{w:16, h:16, col:12, row:9},
        opened:{w:16, h:16, col:13, row:9}
    })
    chest.changeAni('closed')
    chest.scale = StandradRatio/16

    //universal setup
    gameuni()
    

}