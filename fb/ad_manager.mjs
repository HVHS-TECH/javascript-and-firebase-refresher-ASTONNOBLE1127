/***********************************************************/
//
//ad_manager.mjs
//
//holds the admin page functions
//
/***********************************************************/

console.log('%c ad_manager.mjs',
'color: blue; background-color: white;');

/***********************************************************/
//imports
/***********************************************************/

import {fb_read} from "./fb_IO.mjs"

/***********************************************************/
//exports and windowing
/***********************************************************/

export {ad_check}

/***********************************************************/
//ad_check()
//
//checks if user is admin to add admin to header on home page
/***********************************************************/

async function ad_check() {
    console.log('%c ad_check()','color: white; background-color: blue;');
    const user = JSON.parse(localStorage.getItem("userDetails"))
    if (user != null) {
        const result = await  fb_read(user.uid,"/admins/")
        if (result === null) {
            let el = document.createElement('button')
            el.textContent = 'admin'
            el.setAttribute( 'class', "admin")
            el.setAttribute( 'onclick', "pageDirect('./admin.html')")
            document.getElementById('buttonSlot').appendChild(el)
        }
    }
}