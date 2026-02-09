/*******************************************************/
//
// gameLoop.js
//
//written by Aston Noble term 1 2025
//
/*******************************************************/

/*******************************************************/
//gameRun(player)
//runs the game
//input the player
/*******************************************************/

function gameRun(player) {
    //artifacts
    if (level == 1) {
        if (player.overlapping(goldKey)) { 
            artifactFound = true; 
            goldKey.remove(); 
        }
    } else if (level == 2) {
        if (player.overlapping(heartStone)) { 
            artifactFound = true; 
            heartStone.remove();
        }
    }
    
    //canvas
    clear()
    noSmooth()
    background(bgC) 
    camera.x = player.x
    camera.y = player.y - (canvasHeight/6)
    if (player.overlapping(door) && win == false) {
        win = true;
        door.changeAni('open'); 
        xVel = 0; 
        won(); 
    }


    //health related
    if (health / 2 > heartCount) {
        while (health / 2 > heartCount) {
            hearts[heartCount] = new deletes.Sprite(7,7,7,7,'n')
            hearts[heartCount].image = (heart)
            hearts[heartCount].scale = (canvasHeight/194)
            heartCount = heartCount + 1
        }
    }
    healthbar()
    if (0.1 > health && health > -5) {health = health - 1000; death(player);}

    //damage
    if (player.overlapping(spikes)) {
        if (spiked == false) {health--; spiked = true; updateHealth();}
    } else {spiked = false;}

    //game over
    if (restartButton.mouse.presses() && (health < 0 || win == true)) {
        deletes.removeAll(); 
        if (level == 0) {
            tutorial()
        } else if (level == 1) {
            level1()
        } else if (level == 2) {
            level2()
        }
        gameState = 'start'; 
        gameState = 'game'
    }

    if (menuButton.mouse.presses() && (health < 0 || win == true)) {
        deletes.removeAll(); 
        startScreen(); 
        allSprites.opacity = 1
        player.x = -29000
        enemys.x = -29000
        gameState = 'start'
    }

    //attacks
    if (health > 0.5 && win == false) {
        player.overlapping(enemys, canAtk)
        if (stabbing == false && !player.overlapping(enemys)) {
            if (mouse.presses()) {
                PAtk(player)
            }
        }

        //movement
        if (player.overlapping(hopBlock)) {hops = true;}
        if (kb.presses(' ') && player.colliding(
            bricks) && (health > 0 && win == false) && (
            jumping == false || hops == true)) {
            hops = false; 
            player.vel.y =-(canvasHeight/96); 
            jump(player);
        }
        if (kb.pressing('right') && (health > 0 && win == false)) {
            if (xVel < ((canvasHeight/192)*7)) {xVel = xVel + (canvasHeight/192);} 
            walkEast(player);
        } else if (kb.pressing('left') && (health > 0 && win == false)) {
            if (xVel > -((canvasHeight/192)*7)) {xVel = xVel - (canvasHeight/192);}
            walkWest(player);
        } else if (xVel > 0) {xVel = xVel - (canvasHeight/384);
        } else if (xVel < 0) {xVel = xVel + (canvasHeight/384);}
        if (xVel > -(canvasHeight/385) && xVel < (canvasHeight/385)) {xVel = 0}
        player.vel.x = xVel / 10

        //climbing
        if (player.overlapping(climb) && kb.pressing('up')) {
            player.vel.y = -(canvasHeight/230.4); 
            player.drag = 0; 
            climbing(player);
        } else if (player.overlapping(climb) && player.vel.y >= 0 && !(
        kb.pressing('right') || kb.pressing('left') || kb.pressing('down'))) {
            player.drag = 10000000
        } else {player.drag = 0}

        //enemys movement
        for (let i = 0; i < EnemyCount.length; i++) {
            if (((dist(player.x, player.y, enemy[EnemyCount[i]].x, enemy[EnemyCount[i]].y)) > enemy[EnemyCount[i]].atkdist) && 
            (enemy[EnemyCount[i]].trigdist > (dist(player.x, player.y, enemy[EnemyCount[i]].x, enemy[EnemyCount[i]].y))) && Atking == false) {
                ERun(enemy[EnemyCount[i]], player);
            }
        }
        
        //ranged enemys
        projectil.overlaps(player,proDmg)
        projectil.overlapping(bricks,proKill)
        if (shoot == true) {
            project[activeArrow].y += project[activeArrow].typ/project[activeArrow].spd
            project[activeArrow].typ += project[activeArrow].ya/project[activeArrow].arc
            project[activeArrow].x += project[activeArrow].txp /project[activeArrow].spd
        } else {
            for (let i = 0; i < EnemyCount.length; i++) {
                if (((dist(player.x, player.y, enemy[EnemyCount[i]].x, enemy[EnemyCount[i]].y)) < enemy[EnemyCount[i]].atkdist) && 
                enemy[EnemyCount[i]].type == 'ranged'){
                    if ((dist(player.x, player.y, enemy[EnemyCount[i]].x, enemy[EnemyCount[i]].y)) > enemy[EnemyCount[i]].minRange) {
                        shoot = true
                        let arrow = EnemyCount[i] - enemy[EnemyCount[i]].child
                        EShoot(enemy[EnemyCount[i]],player,project[arrow],arrow)
                    }
                }
            }
        }    
    }
}
