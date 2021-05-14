import {cstopics, csdomains, cssubdomains} from './csmodule.js';
import { firebaseConfig } from './config.js';
import { getUser, getCourseTopics, saveCourseTopics, validateEmail } from './users.js';


firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let auth;
let changes= false;
let selectedCourse=null;

const topics = [];

//########################### Window Functions #########################

window.courseSelected = function(event){
  const value = event.target.value;
  
  if(value !== 'default'){
    if(changes){
      let ans = confirm('You will lose unsaved changes if you switch courses now. Click cancel then click the red button to save or click ok to proceed.');
      if(ans){
        loadForm(value);
        showPending(false);
      }else{
        event.target.value = selectedCourse
      }
    }else{
      showPending(false);
      loadForm(value);
    }
  }

}

window.updateCount = function(){
  const form = document.querySelector('#myform');
  const selectedTopics = new FormData(form).getAll('topics');
  const numTopics = selectedTopics.length;
  showPending(true)
  document.querySelector('#count').innerHTML = numTopics;
}


window.selectTopics = async function(event){
  event.preventDefault();
  const formData = new FormData(event.target);
  const selected = formData.getAll('topics');
  const course = formData.get('course');
  await saveCourseTopics(auth.email, course, selected, db);
  showPending(false);
  M.toast({html: `${selected.length} Topics saved to ${course} !`, classes: 'rounded'});
}

window.logout = async function(){
  await firebase.auth().signOut();
}

// ########################## Module Functions #########################

function showCount(num){
  document.querySelector('#count').innerHTML = num;
}

function showPending(pending){
  changes = pending;
  const html = pending ? `<div class="chip red white-text">Pending Changes<i class="close material-icons">warning</i></div>` : '<div class="chip green white-text">All Changes Saved<i class="close material-icons">check</i></div>';
  document.querySelector('#pending').innerHTML = html;          
}

function showHelpModal(){
}

function topicsTemplate(subdomain, selected){
  let html='';

  for(let topic of subdomain){
    const topicVal = `${topic.topicId} - ${topic.topic}`;
    topics.push(topicVal);
    html+=`
      <p>
        <label>
          <input type="checkbox" onclick="updateCount()" ${ selected.includes(topicVal) ? 'checked' : '' } name="topics" value="${topicVal}" />
          <span class="black-text">${topicVal}</span>
        </label>
      </p>
    `;
  }

  return html;

}

function subDomainTemplate(domain, selectedTopics){
  let html='';

  for(let subdomain in domain){
    html+=`
        <li>
          <div class="collapsible-header">${subdomain} -  ${cssubdomains[subdomain]}</div>
            <div class="collapsible-body">
              ${topicsTemplate(domain[subdomain], selectedTopics)}                    
            </div>
        </li>
    `;
  }
  return html;
}

async function loadForm(course){
  let html="";

  const loader = document.querySelector('#loader');
  loader.innerHTML = '<div class="progress"><div class="indeterminate"></div></div>';

  selectedCourse = course;

  const selectedTopics = await getCourseTopics(auth.email, course, db);

  for(let domain in cstopics){

      html+=`
      <li>
        <div class="collapsible-header">${domain} - ${csdomains[domain]}</div>
          <div class="collapsible-body">
            <ul class="collapsible">
              ${subDomainTemplate(cstopics[domain], selectedTopics)}
            </ul>
          </div>
      </li>
      `;
  }

  loader.innerHTML = '';

  showCount(selectedTopics.length)

  document.querySelector('#input').innerHTML = html;
  
  M.Collapsible.init(document.querySelectorAll('.collapsible'));
}

function displayUser({email}){
  if(!validateEmail(email)){
    alert(`No user found for ${email}`);
  }else{
    let {courses, name} = getUser(email);
    let html=' <option disabled value="default" selected>Select Course</option>';
    for(let course in courses){
      html+=`<option>${course}</option>`;
    }
    const courseSelect = document.querySelector('#course');
    courseSelect.innerHTML = html;
    M.FormSelect.init(courseSelect);
    document.querySelector('#name').innerHTML = 'Welcome '+name;
  }
 
}

async function validateAuth(){

  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    
    var email = window.localStorage.getItem('emailForSignIn');
    
    if(!email){
        email = window.prompt('Please provide your email for confirmation');
    }

    try{
      auth  = await firebase.auth().signInWithEmailLink(email, window.location.href);

      window.localStorage.removeItem('emailForSignIn');
      
      if(auth.additionalUserInfo.isNewUser)
        showHelpModal()
      
      displayUser(auth);
    }catch(e){
      console.error(e);
        window.location.href="./index.html";
    }

  } else {

    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        auth = user;
        displayUser(user);
      }else{
        window.location.href="./index.html";
      }
    }); 
  }
  
}


validateAuth();
  


