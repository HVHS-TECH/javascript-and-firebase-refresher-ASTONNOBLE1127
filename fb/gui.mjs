/***********************************************************/
//
//gui.mjs
//
//holds the admin page functions
//
/***********************************************************/

console.log('%c gui.mjs',
'color: blue; background-color: white;');

/***********************************************************/
//imports
/***********************************************************/

import {pageDirect,pageChange,accountButton,fb_logout} from "./fb_IO.mjs";
import { ad_check } from "./ad_manager.mjs";

/***********************************************************/
//exports and windowing
/***********************************************************/

export {header}
window.play = play
window.profile = profile


/***********************************************************/
//play()
//
//sends user to game if they're logged in
// or popup to tell them to if not
//inputs
//path, desired game
/***********************************************************/

async function play(path) {
    console.log('%c play('+path+')','color: white; background-color: lime;');
    const result = await pageChange()
    if (result != null) {
        pageDirect(path)
    } else {
       $('.hover_bkgr_fricc').show();
    }
}

/***********************************************************/
//profile()
//
//top corner dropdown
/***********************************************************/

function profile() {
    console.log('%c profile()','color: white; background-color: lime;');
    document.getElementById("myDropdown").classList.toggle("show");
}

/***********************************************************/
//header()
//
//makes the header for all pages 
/***********************************************************/

function header() {
    console.log('%c header()','color: white; background-color: lime;');
    const HEAD = document.querySelector('header')
    let home = document.createElement("img")
    let button = document.createElement("div")
    let dropdown = document.createElement("div")
    let dropbut = document.createElement("div")
    let profile = document.createElement("img")
    let dropdown2 = document.createElement("div")
    let acc = document.createElement("a")
    let logou = document.createElement("a")

    home.setAttribute('src',"./home-icon.jpg")
    home.setAttribute('class',"home")
    home.setAttribute('onclick',"pageDirect('./index.html')")
    button.setAttribute('id',"buttonSlot")
    dropdown.setAttribute('class',"dropdown")
    dropbut.setAttribute('onmouseover',"profile()")
    dropbut.setAttribute('class',"dropbtn")
    profile.setAttribute('id',"pfp")
    profile.setAttribute('src',"https://lh3.googleusercontent.com/a/ACg8ocIBwGIt9IR2zzutMP_-XpjJpScb0JeaAuI7Vrh5U7UUTZ4HxQ=s96-c")
    dropdown2.setAttribute('id',"myDropdown")
    dropdown2.setAttribute('class',"dropdown-content")
    acc.setAttribute('id',"account")
    logou.setAttribute('id',"logout")
    logou.innerHTML = "Logout"
    acc.innerHTML = "Account"

    HEAD.appendChild(home)
    HEAD.appendChild(button)
    HEAD.appendChild(dropdown)
    dropdown.appendChild(dropbut)
    dropbut.appendChild(profile)
    dropdown.appendChild(dropdown2)
    dropdown2.appendChild(acc)
    dropdown2.appendChild(logou)
    
    acc.addEventListener("click", accountButton);
    logou.addEventListener("click", fb_logout);
    ad_check()
}