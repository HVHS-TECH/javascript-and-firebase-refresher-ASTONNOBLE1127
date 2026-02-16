/***********************************************************/
//
//fb_reg.mjs
//
//holds the firebase registration functions
//
/***********************************************************/

console.log('%c fb_reg.mjs',
'color: blue; background-color: white;');

/***********************************************************/
//imports
/***********************************************************/

import { fb_write,pageDirect } from "./fb_IO.mjs";

/***********************************************************/
//exports and windowing
/***********************************************************/

export {reg_submit,reg_load}

/***********************************************************/
//reg_load()
//
//sets up registration page
/***********************************************************/

function reg_load() {
    console.log('%c reg_load()','color: white; background-color: yellow;');
    let userDetails = JSON.parse(localStorage.getItem("userDetail"))
    console.log(userDetails)
    emailbox.setAttribute("value", userDetails.email)
    emailbox.setAttribute("disabled", true)
    userbox.setAttribute("value", userDetails.displayName)
    namebox.setAttribute("value", userDetails.displayName)
    userbox.setAttribute("disabled", true)
}

/***********************************************************/
//reg_submit()
//
//writes the form results from registration to the database
/***********************************************************/

async function reg_submit() {
    console.log('%c reg_submit()','color: white; background-color: yellow;');
    if ((130 >= document.getElementById("agebox").value && document.getElementById("agebox").value >= 5) && (document.getElementById("agebox").value && document.getElementById("namebox").value != null) && (document.getElementById("genders").value != "")) {
        let userDetails = JSON.parse(localStorage.getItem("userDetail"))
        userDetails.username = document.getElementById("namebox").value
        userDetails.age = Number(document.getElementById("agebox").value)
        userDetails.gender = document.getElementById("genders").value
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        let temp = "{'"+userDetails.uid+"':'"+userDetails.username+"'}"
        const publicDisplayName = await fb_write("","/uidVault/",temp)
        const result = await fb_write(userDetails.uid, "/users/", userDetails)
        pageDirect("./index.html")
        
    } else {
        wrongtry.innerHTML = "please fill in all fields"
    }
} 
