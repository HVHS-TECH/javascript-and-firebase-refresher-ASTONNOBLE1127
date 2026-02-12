/***********************************************************/
//
//fb_IO.mjs
//
//holds the firebase functions
//
/***********************************************************/

console.log('%c fb_IO.mjs',
'color: blue; background-color: white;');
//vars and consts
const COL_C = 'white'; // These two const are part of the coloured text	
const COL_B = '#CD7F32';
var userDetails

const FB_GAMECONFIG = {
    apiKey: "AIzaSyBXnJbWcqld7Wwg4bfc5CmLV9LDhxwVSAI",
    authDomain: "comp-2025-aston-noble.firebaseapp.com",
    projectId: "comp-2025-aston-noble",
    storageBucket: "comp-2025-aston-noble.firebasestorage.app",
    messagingSenderId: "936615098052",
    appId: "1:936615098052:web:35756cde6e8a4e9ac6fb91",
    measurementId: "G-K6HXDNE2S4"
};

let globalLoopTrack = 0
let adminLoopTrack
let adminRemoverTrack = 0
let accountKeysLength

/***********************************************************/
//imports
/***********************************************************/

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
    getDatabase,
    ref,
    get,
    update,
    query,
    orderByChild,
    orderByKey,
    limitToFirst,
    onValue
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {reg_submit} from "./fb_reg.mjs"

/***********************************************************/
//exports and windowing
/***********************************************************/

export {
    fb_initialise,
    pageChange,
    fb_write,
    fb_read,
    pageDirect,
    fb_logout,
    accountButton
}

window.adminload = adminload
window.magic = magic
window.updateScore = updateScore
window.account =account
window.leaderload = leaderload
window.pageDirect = pageDirect
window.leaderBoard = leaderBoard
window.wheelUpdate = wheelUpdate


/***********************************************************/
//buttons
/***********************************************************/

if (document.getElementById("subutton1")) {
    document.getElementById("subutton1").addEventListener("click", formSub);
}
if (document.getElementById("textSend")) {
    document.getElementById("textSend").addEventListener("click", textSend);
}
if (document.getElementById("popbut")) {
    popbut1.addEventListener("click", accountButton);
    popbut.addEventListener("click", accountButton);
}

//if the dropdown is open and user clicks elsewhere closes dropdown
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


/***********************************************************/
//fb_initialise()
//
//initialises the firebase
/***********************************************************/

function fb_initialise() {
    console.log('%c fb_initialise(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const FB_GAMEAPP = initializeApp(FB_GAMECONFIG);
    const FB_GAMEDB = getDatabase(FB_GAMEAPP);
    console.info(FB_GAMEDB);
    fb_moniter()
}

/***********************************************************/
//pageDirect()
//
//sends users to other pages
//inputs
//dest, destination
/***********************************************************/

function pageDirect(dest) {
    console.log('%c pageDirect('+dest+')', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    window.location.href = dest
}

/***********************************************************/
//formSub()
//
//runs on form submission and validates weather
//inputs are valid then writes them to the database
/***********************************************************/

function formSub() {
    console.log('%c formSub()', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    if (window.location.pathname == '/register.html') {
        reg_submit()
    } else {
        if (window.location.pathname == '/admin.html') {
            for (let m = adminLoopTrack; globalLoopTrack > m; m++) {
                let fieldValue = document.getElementById(m + 100).value
                document.getElementById(m + 100).setAttribute('value',fieldValue)
                document.getElementById(m + 100).style.backgroundColor = 'white'
                let val2 = document.getElementById(m + 100).getAttribute('class')
                let val
                if (Number(fieldValue)){
                    if (val2 != "levelScores") {
                        val = JSON.parse('{"' + val2 + '":' + fieldValue + '}')
                    } else {
                        val = JSON.parse('{"' + val2 + '":"' + String(fieldValue) + '"}')
                    }
                } else {
                    val = JSON.parse('{"' + val2 + '":"' + fieldValue + '"}')
                }
                let writeLocation = document.getElementById(m).getAttribute('class')
                fb_write('',writeLocation,val)
            }
        } else if (window.location.pathname == "/account.html") {
            if (!isNaN(document.getElementsByName('age')[0].value) && (document.getElementsByName('username')[0].value != '') && (document.getElementsByName('gender')[0].value != '') && (Number(document.getElementsByName('age')[0].value) > 0) && (Number(document.getElementsByName('age')[0].value) <= 130)) {
                const userDetails = JSON.parse(localStorage.getItem("userDetails"));
                for (let i = 0; i < accountKeysLength; i++) {
                    let fieldValue = document.getElementById(i + 150).value
                    document.getElementById(i + 150).style.backgroundColor = 'lime'
                    let val2 = document.getElementById(i + 50).textContent
                    let val
                    if (!isNaN(fieldValue)) {
                        val = JSON.parse('{"' + val2 + '":' + fieldValue + '}')
                    } else {
                        val = JSON.parse('{"' + val2 + '":"' + fieldValue + '"}')
                    }
                    fb_write(userDetails.uid,'/users/',val)
                }
            } else {
                if (isNaN(document.getElementsByName('age')[0].value) || ((Number(document.getElementsByName('age')[0].value) <= 0) || (Number(document.getElementsByName('age')[0].value) > 130))) {
                    document.getElementsByName('age')[0].style.backgroundColor = 'red'
                }
                if (document.getElementsByName('username')[0].value == '') {
                    document.getElementsByName('username')[0].style.backgroundColor = 'red'
                }
                if (document.getElementsByName('gender')[0].value == '') {
                    document.getElementsByName('gender')[0].style.backgroundColor = 'red'
                }
            }
        }
    }
}

/***********************************************************/
//googleAuthenticate()
//
//authenticates the user to google
/***********************************************************/

async function googleAuthenticate() {
    console.log('%c googleAuthenticate()', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const PROVIDER = new GoogleAuthProvider();
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });
    signInWithPopup(getAuth(), PROVIDER).then(async (result) => {
        userDetails = {
            uid: result.user.uid,
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
        }
        const result1 = await  fb_read(userDetails.uid,"/users/")
        if (result1 == null) {
            localStorage.setItem("userDetail", JSON.stringify(userDetails));
            console.warn("account doesn't exist")
            pageDirect("./register.html")
        } else {
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            pageDirect("./index.html")
        }
    }).catch((error) => {
        console.error("❌authentication error: " + error)
        alert("❌authentication error: " + error)
    });
}

/***********************************************************/
// fb_read(what,where)
//
//takes inputs and reads the firebase
//input
//what, object/deeper path returning
//where, path of object returning
//
//output, true
/***********************************************************/

async function  fb_read(what, where) {
    console.log('%c  fb_read(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    console.log(where + what)
    return await get(ref(getDatabase(), where + what)).then((snapshot) => {
        if (snapshot.val() == null) {
            console.warn("doesn't exist")
            return null
        } else {
            return snapshot.val();
        }
    }).catch((error) => {
        console.error("❌read error: " + error)
    });
}

/***********************************************************/
//fb_write()
//
//takes inputs and writes to the database
//input
//where, path
//where2, path addon (if nessessary)
//what, what its writing
//
//output,true
/***********************************************************/

async function fb_write(where2, where, what) {
    console.log('%c fb_write(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
        fb_log(where2, where, what)
    return await update(ref(getDatabase(), where + where2 + "/"), what).then((snapshot) => {
        return snapshot
    }).catch((error) => {
        console.error("❌write error: " + error)
        alert("❌write error: " + error)
        return error
    });
}

/***********************************************************/
//fb_log()
//
//takes writes and logs to the database
//input
//where, path
//where2, path addon (if nessessary)
//what, what its writing
//
//output,true
/***********************************************************/

async function fb_log(where2, where, what) {
    console.log('%c fb_log(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    console.log(userDetails)
    const d = new Date();
    const time = d.getFullYear()+","+(d.getMonth()+1)+","+d.getDate()+","+d.getHours()+","+d.getMinutes()+","+d.getSeconds()
    return await update(ref(getDatabase(), "log/" + JSON.parse(localStorage.getItem("userDetails")).uid + "/"+time+"/"), what).then((snapshot) => {
        return snapshot
    }).catch((error) => {
        console.error("❌write error: " + error)    
        alert("❌write error: " + error)
        return error
    });
}

/***********************************************************/
//fb_moniter()
//
//takes inputs and writes to the database
//input
//where, path
//where2, path addon (if nessessary)
//what, what its writing
//
//output,true
/***********************************************************/

function fb_moniter() {
    onValue(ref(getDatabase(),"chat/"), (snapshot) => {

        var fb_data = snapshot.val();

        if (fb_data != null) {

            if(document.URL.includes("chatroom.html")) {
                fb_sortedRead_chat()
            }

        } else {

           console.log("✅ Code for no record found goes here")

        }

    });
}

/***********************************************************/
//adminload()
//
//sets up adminpage
/***********************************************************/

async function adminload() {
    console.log('%c adminload', 'color: white; background-color: blue;');
    const result = await  fb_read("", "/")
    let key = Object.keys(result)
    while (globalLoopTrack < key.length) {
        const newElement = document.createElement('button');
        newElement.textContent = key[globalLoopTrack];
        newElement.setAttribute('id', globalLoopTrack);
        newElement.setAttribute('onclick', 'magic(' + globalLoopTrack + ')');
        document.body.appendChild(newElement);
        globalLoopTrack++
    }
}

/***********************************************************/
//magic(a)
//
//basically magic
//creates the buttons and forms for the admin page
//input
//a, the id of the button
/***********************************************************/

async function magic(a) {
    console.log('%c magic('+a+')', 'color: white; background-color:blue;');
    let readDest = ""
    if (document.getElementById(a).getAttribute('class') == null) {
        readDest = ""
    } else {
        if (document.getElementById(a).getAttribute('class').slice(0,1) != "/") {
            readDest = "/" + document.getElementById(a).getAttribute('class')
        } else {
            readDest = document.getElementById(a).getAttribute('class')
        }
    }
    let where = document.getElementById(a).textContent
    const result = await  fb_read("/" + where + "/", readDest)
    let key
    if (result != null && (typeof result == 'object')) {
        key = Object.keys(result)
        adminLoopTrack = globalLoopTrack
        let type = 'button'
        while (globalLoopTrack < key.length + adminLoopTrack) {
            type = 'button'
            var fuc
            if (typeof Object.values(result) == 'object') {
                fuc = Object.values(result)
                for (let i = 0; i < fuc.length; i++) {
                    if (typeof fuc[i] != 'object') {
                        type = 'label'
                        break;
                    }
                }
                const newElement = document.createElement(type);
                newElement.textContent = key[globalLoopTrack - adminLoopTrack];
                newElement.setAttribute('id', globalLoopTrack);
                newElement.setAttribute('onclick', 'magic(' + globalLoopTrack + ')');
                if (document.getElementById(a).getAttribute('class') == null) {
                    newElement.setAttribute('class', "/" + where)
                } else {
                    newElement.setAttribute('class',document.getElementById(a).getAttribute('class') + "/" + where)
                }
                document.body.appendChild(newElement);
                if (type == 'label') { 
                    const newElement = document.createElement('input');
                    newElement.setAttribute('value', fuc[globalLoopTrack-adminLoopTrack])
                    newElement.setAttribute('id', globalLoopTrack + 100)
                    newElement.setAttribute('class',key[globalLoopTrack-adminLoopTrack])
                    newElement.setAttribute('valueOG',fuc[globalLoopTrack-adminLoopTrack])
                    newElement.setAttribute('inputCH','')
                    newElement.addEventListener("input", () => {
                            let inputs = $('[inputCH]');
                            console.log(inputs)
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute('value') == inputs[i].value) {
            document.getElementById(inputs[i].getAttribute('id')).style.backgroundColor = 'lime'

        } else {
            document.getElementById(inputs[i].getAttribute('id')).style.backgroundColor = 'orange'
        }
    }
                    })
                    document.body.appendChild(newElement);
                }
                const newElemnt = document.createElement('p');
                document.body.appendChild(newElemnt);
                globalLoopTrack++
            } else {
                globalLoopTrack++
            }
        }
        if (type == 'label') {
                const newElemnt = document.createElement('button');
                newElemnt.setAttribute('id','subutton1')
                newElemnt.innerHTML='submit'
                newElemnt.addEventListener("click", formSub);
                document.getElementById('form').appendChild(newElemnt);
        }
        let p = adminLoopTrack
        p--
        let e = adminRemoverTrack
        while (p>=adminRemoverTrack) {
            document.getElementById(p).remove()
            p--
            e++
        }
        adminRemoverTrack = e
    }
}

/***********************************************************/
//pageChange()
//
//determines weather user logged in or out
//output, true
/***********************************************************/

async function pageChange() {
    let result
    await onAuthStateChanged(getAuth(), (user) => {
        if (user != null) {
            console.log("✅User logged in")
            result = user
        } else {
            console.log("✅User logged out")
            result = null
        }
    }, (error) => {
        console.error("❌onAuthStateChanged error: " + error)
        alert("❌onAuthStateChanged error: " + error)
        result = null
    });
    return result
}

/***********************************************************/
//accountButton()
//
//logs in user or sends to account page
/***********************************************************/

async function accountButton() {
    const result = await pageChange()
    if (result != null && localStorage.getItem('userDetails') != 'null') {
        pageDirect("./account.html")
    } else {
        googleAuthenticate()
    }
}

/***********************************************************/
//fb_logout()
//
//logs user out
/***********************************************************/

function fb_logout() {
    signOut(getAuth())
    localStorage.setItem("userDetails",null)
    pageDirect("./index.html")
}

/***********************************************************/
//updateScore()
//
//updates the score to the database for dungeon divers
/***********************************************************/

async function updateScore(stars,level) {
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    let result = await  fb_read("levelScores","/scores/DD_scores/" + userDetails.uid + "/")
    if (result == null) {
        result = "00000"
    }
    if (stars > result.slice(level,level+1)) {
        let tim = {DD_scores: result.slice(0,level) + stars + result.slice(level + 1, result.length)}
        let tam = JSON.parse(('{"levelScores":"'+tim.DD_scores+'"}'))
        fb_write("","/scores/DD_scores/" + userDetails.uid + "/",tam)
        let scoreCompile = 0
        let scoreTotal = Object.values(tim.DD_scores)
        for (let i = 0; i < scoreTotal.length; i++) {
            scoreCompile += Number(scoreTotal[i])
        }
        let tum = JSON.parse(('{"highScore":'+scoreCompile+'}'))
        fb_write("","/scores/DD_scores/" + userDetails.uid + "/",tum)
    }
    scoreTotal = Object.values(result)
    for (let I = 0; I < scoreTotal.length;I++) {
        scoreTotal[I] = Number(scoreTotal[I])
    }
    let user = await  fb_read(userDetails.uid,"/users/")    
    let tom = JSON.parse(('{"name":"'+user.username+'"}'))     
    fb_write("","/scores/DD_scores/" + userDetails.uid + "/",tom)
}

/***********************************************************/
//account()
//
//loads the account page
/***********************************************************/

async function account() {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const result = await  fb_read(userDetails.uid + "/","/users/")
    let keys = Object.keys(result)
    let values = Object.values(result)
    accountKeysLength = keys.length
    for (let I = 0; I < keys.length; I++) {
        let key = document.createElement('label')
        let value = document.createElement('input')
        key.textContent = keys[I]
        value.setAttribute('value',values[I])
        key.setAttribute('id',50 + I)
        value.setAttribute('id',150 + I)
        value.setAttribute('inputCH','')
        value.setAttribute('name',keys[I])
        if (keys[I] == 'displayName' || keys[I] ==  'email' || keys[I] ==  'photoURL' || keys[I] ==  "uid") {
            value.setAttribute("disabled", true)
        }
        document.getElementById('form').appendChild(key)
        document.getElementById('form').appendChild(value)
        value.addEventListener("input", () => {
                            let inputs = $('[inputCH]');
                            console.log(inputs)
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute('value') == inputs[i].value) {
            document.getElementById(inputs[i].getAttribute('id')).style.backgroundColor = 'lime'

        } else {
            document.getElementById(inputs[i].getAttribute('id')).style.backgroundColor = 'orange'
        }
    }
                    })
        let p = document.createElement('p')
        document.getElementById('form').appendChild(p)
    }
    
                const newElemnt = document.createElement('button');
                newElemnt.setAttribute('id','subutton1')
                newElemnt.innerHTML='submit'
                newElemnt.addEventListener("click", formSub);
                document.getElementById('form').appendChild(newElemnt);
}
       
/***********************************************************/
//fb_sortedRead()
//
//makes the leaderboard
//input
//locate, the path of the scores
/***********************************************************/

async function fb_sortedRead(locate) {
    const dbReference = query(ref(getDatabase(),locate), orderByChild("highScore"), limitToFirst(3));
    get(dbReference).then((Snapshot) => {
        let objs = []
        Snapshot.forEach(function (userScoreSnapshot) {
            objs.push(userScoreSnapshot.val())
        })
        objs = objs.reverse()
        for (let i = 0; i < objs.length; i++) {
            let place = document.createElement('label')
            let key = document.createElement('label')
            let value = document.createElement('label')
            place.textContent = ((i + 1) + ": ")
            key.textContent = objs[i].name + ": "
            value.textContent = objs[i].highScore
            place.setAttribute('class','leaderitem')
            key.setAttribute('class','leaderitem')
            value.setAttribute('class','leaderitem')
            document.getElementById("placement").appendChild(place)
            document.getElementById("usersName").appendChild(key)
            document.getElementById("usersScore").appendChild(value)
        }
    });
}
       
/***********************************************************/
//fb_sortedRead_chat()
//
//makes the leaderboard
//input
//locate, the path of the scores
/***********************************************************/

async function fb_sortedRead_chat() {
    let timmy = document.getElementsByClassName('leaderitem')
    for(let i=timmy.length;i>0;i--){
        console.log(timmy)
        await timmy[i-1].remove()}
    const dbReference = query(ref(getDatabase(),"/chat"), orderByKey(), limitToFirst(100));
    const Snapshot = await get(dbReference)
        let objs = []
        console.log(objs)
        Snapshot.forEach((userScoreSnapshot) => {
            //let temp = JSON.stringify(Object.values(userScoreSnapshot.val()))
            //console.log(userScoreSnapshot.val())
            //console.log(Object.values(userScoreSnapshot.val()))
            //console.log(temp)
            objs.push(userScoreSnapshot.val())
        });
        console.log(objs)
        //console.log(JSON.stringify(objs))
        objs = objs.reverse()
        for (let i = 0; i < objs.length; i++) {
            //let place = document.createElement('label')
            let key = document.createElement('label')
            let value = document.createElement('label')
            //place.textContent = ((i + 1) + ": ")
            let displayedname = await fb_read(objs[i].uid+"/username","users/")
            key.textContent = displayedname + ": "
            console.log(fb_read(objs[i].uid+"/username","users/"))
            value.textContent = objs[i].message
            //place.setAttribute('class','leaderitem')
            key.setAttribute('class','leaderitem')
            value.setAttribute('class','leaderitem')
            //document.getElementById("placement").appendChild(place)
            document.getElementById("usersName").appendChild(key)
            document.getElementById("usersScore").appendChild(value)
        }
    
}

/***********************************************************/
//textSend()
//
//sets leaderboard to specific one
/***********************************************************/

function textSend() {
    //let message = document.getElementById("textInput").value
    //let uid = localStorage.getItem("userDetails").uid
    let timestamp = Date.now()
    let temp = {}
    temp.uid = JSON.parse(localStorage.getItem("userDetails")).uid
    temp.message = document.getElementById("textInput").value
    fb_write(timestamp,"/chat/",temp)
    //fb_write("","/chat/",JSON.parse("{'"+timestamp + "':{'message':'"+message+"'},{'uid':'"+uid+"'}}"))
}

/***********************************************************/
//leaderload()
//
//sets leaderboard to specific one
/***********************************************************/

async function leaderload() {
    let path = await localStorage.getItem("leaderpath")
    fb_sortedRead("scores/"+path)
    leaderSide(path)
}

/***********************************************************/
//leaderBoard()
//
//sends to leaderboard
//input
//path, part of the path of the desired leaderboard
/***********************************************************/

async function leaderBoard(path) {
    await localStorage.setItem("leaderpath",path)
    pageDirect('./Leaderboard.html')
}

/***********************************************************/
//wheelUpdate()
//
//updates the highscore for the wheel game
//inputs
//WhScore, current score as of function load
/***********************************************************/

async function wheelUpdate(WhScore) {
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
    let result = await  fb_read("highScore","/scores/Wh_scores/" + userDetails.uid + "/")
    console.log(result)
    if ((WhScore > result) || (result == null)) {
        let subscore = JSON.parse(('{"highScore":'+WhScore+'}'))
        fb_write("","/scores/Wh_scores/" + userDetails.uid + "/",subscore)
    
    let user = await  fb_read(userDetails.uid,"/users/")    
    let tom = JSON.parse(('{"name":"'+user.username+'"}'))     
    fb_write("","/scores/Wh_scores/" + userDetails.uid + "/",tom)
    }
}

/***********************************************************/
//leaderSide()
//
//sidebar for leaderboard
//input
//path, current leaderboard
/***********************************************************/

async function leaderSide(path) {
    let result = await  fb_read("","/scores/")
    let keys = Object.keys(result)
    for (let i = 0; i < keys.length; i++) {
            let value = document.createElement('p')
            value.textContent = keys[i]
            value.setAttribute('onclick',"leaderBoard('" + keys[i] + "')")
            value.style.textAlign="center"
            if (keys[i] == path) {
                value.style.backgroundColor = "#aaaa00"
            }
            document.getElementById("left").appendChild(value)
    }
}
