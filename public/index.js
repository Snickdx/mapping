import { registerSW } from './register.js';
import { firebaseConfig } from './config.js';
import { debug, devHost, prodHost } from './global.js';

if(!debug)
    registerSW();

const host = debug ? devHost : prodHost;
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

firebase.auth().onAuthStateChanged((user) => {
    console.log('Hello', user);
    if (user)
        window.location.href="./app.html";
});
      
function showMessage(text){
    document.querySelector('#message').innerHTML = `
    <div class="card-panel">
        <p>${text}</p>
    </div>
    `;
}


window.login = async function(event){
    event.preventDefault();

    console.log(host, devHost);

    var actionCodeSettings = {
        url: host,
        handleCodeInApp: true
    };

    const email = event.target.elements['email'].value;

    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    try{
        await auth.sendSignInLinkToEmail(email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        showMessage(`An email has been sent to ${email}, please check your email for a login link.`);
    }catch(error){
        console.log(error.code, error.message);
        alert(`Login Error, please ensure you enter the same email used when logging in.`);
    }
}