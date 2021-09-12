
import { registerSW } from './register.js';
import { firebaseConfig } from './config.js';
import { initializeApp } from 'firebase/app';
import { debug, devHost, prodHost } from './global.js';

import { getAuth, sendSignInLinkToEmail, onAuthStateChanged, setPersistence } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const host = debug ? devHost : prodHost;
const auth = getAuth();

if(!debug)
  registerSW();

// onAuthStateChanged((user) => {
//     if (user)
//         window.location.href="../app.html";
// });

function showMessage(text){
    document.querySelector('#message').innerHTML = `
    <div class="card-panel">
        <p>${text}</p>
    </div>
    `;
}

window.login = async function(event){
    event.preventDefault();

    const actionCodeSettings = {
        url: host,
        handleCodeInApp: true
    };

    const email = event.target.elements['email'].value;

    try{
        // https://firebase.google.com/docs/auth/web/auth-state-persistence
        await setPersistence(auth);
        await sendSignInLinkToEmail(email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        showMessage(`An email has been sent to ${email}, please check your email for a login link.`);

    }catch(error){

        alert(error.message);
        console.error(error.code, error.message);
    }
}




