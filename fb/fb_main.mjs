/***********************************************************/
//
//fb_main.mjs
//
//controls i guess
//
/***********************************************************/


console.log('%c fb_main.mjs',
'color: blue; background-color: white;');

/***********************************************************/
//imports
/***********************************************************/

import {fb_initialise, pageChange} from "./fb_IO.mjs"
import { reg_load } from "./fb_reg.mjs";
import {header} from "./gui.mjs"

/***********************************************************/
//exports and windowing
/***********************************************************/



/***********************************************************/
//on html load
/***********************************************************/

window.addEventListener('DOMContentLoaded', () => {
    fb_initialise();
    pageChange()
    header()
    if (window.location.pathname == "/register.html") {reg_load();
    }
    if (JSON.parse(localStorage.getItem("userDetails")) != (undefined || null)) {
        let userDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (document.getElementById("pfp")) {
        pfp.setAttribute("src",userDetails.photoURL);
        console.log(userDetails.photoURL)
        }
    } else {
        console.log("no user");
        if (document.getElementById("pfp")) {
            pfp.setAttribute("src","./unnamed.png")
        }
    }
});



