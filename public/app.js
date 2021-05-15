import {cstopics, csdomains, cssubdomains} from './csmodule.js';
import { firebaseConfig } from './config.js';
import { getUser, getCourseTopics, saveCourseTopics } from './users.js';


firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

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
        event.target.value = selectedCourse;
      }
    }else{
      showPending(false);
      loadForm(value);
    }
  }

}

window.updateCount = function(event){
  const form = document.querySelector('#myform');
  const selectedTopics = new FormData(form).getAll('topics');
  const numTopics = selectedTopics.length;
  const topic = event.target.value;
  let array = topic.split('-');
  let domain = array[0].trim();
  let subdomain = `${domain}-${array[1].trim()}`;
  
  updateStatsUI(domain, event.target.checked);
  updateStatsUI(subdomain, event.target.checked);

  
  showPending(true)
  showCount(numTopics);
}


window.selectTopics = async function(event){
  event.preventDefault();
  const formData = new FormData(event.target);
  const selected = formData.getAll('topics');
  const course = formData.get('course');
  let auth = firebase.auth().currentUser;
  showLoader();
  await saveCourseTopics(auth.email, course, selected, db);
  showPending(false);
  hideLoader();
  M.toast({html: `${selected.length} Topics saved to ${course} !`, classes: 'rounded'});
}

window.logout = async function(){
  console.log('Logging Out');
  await firebase.auth().signOut();
  window.location.href="./index.html";
}

// ########################## Module Functions #########################

function getStats(topics){
  const result = {};
  for(let topic of topics){
    let array = topic.split('-');
    let domain = array[0].trim();
    let subdomain = `${domain}-${array[1].trim()}`;
    
    if(domain in result){
      result[domain]++;
    }else{
      result[domain]=1;
    }

    if(subdomain in result){
      result[subdomain]++;
    }else{
      result[subdomain]=1;
    }
  }
  return result;
}

function updateStatsUI(target, increment){
  const elem = document.querySelector(`#${target}`); 
  let num = elem.innerHTML.trim();
  num = parseInt(num);

  if(increment)
    num++;
  else
    num--;
  
  elem.innerHTML = num;
  
}

function getColor(num){
  let color = [ 'red lighten-5', 'pink lighten-5', 'purple lighten-5', 'deep-purple lighten-5', 'indigo lighten-5', 'cyan lighten-5', 'teal lighten-5', 'green lighten-5', 'lime lighten-5', 'yellow lighten-5', 'orange lighten-5', 'deep-orange lighten-5' ];
  return color[num%color.length];
}

function showCount(num){
  document.querySelector('#count').innerHTML = `<div class="chip">${num} Topics in Total</div>`;
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
          <input type="checkbox" onclick="updateCount(event)" ${ selected.includes(topicVal) ? 'checked' : '' } name="topics" value="${topicVal}" />
          <span class="black-text">${topicVal}</span>
        </label>
      </p>
    `;
  }

  return html;

}

function subDomainTemplate(domain, selectedTopics, stats){
  let html='';

  for(let subdomain in domain){
    html+=`
        <li>
          <div class="collapsible-header">
            <div class="col s11">${subdomain} -  ${cssubdomains[subdomain]}</div>
            <div class="col s1"><div class="chip" id="${subdomain}"> ${stats[subdomain] ?  stats[subdomain]:'0' }</div></div>
          </div>
            <div class="collapsible-body white">
              ${topicsTemplate(domain[subdomain], selectedTopics, stats)}                    
            </div>
        </li>
    `;
  }
  return html;
}

function showLoader(){
  const loader = document.querySelector('#loader');
  loader.style.display = 'block';
}

function hideLoader(){
  const loader = document.querySelector('#loader');
  loader.style.display = 'none'
}

async function loadForm(course){
  let html="";

  showLoader();

  selectedCourse = course;

  let auth = firebase.auth().currentUser;

  const selectedTopics = await getCourseTopics(auth.email, course, db);
  let domainCount = 0;
  let stats = getStats(selectedTopics);

  for(let domain in cstopics){

      html+=`
      <li>
        <div class="collapsible-header ${getColor(domainCount)}">
        <div class="col s11">${domain} - ${csdomains[domain]}</div>
        <div class="col s1"><div class="chip" id="${domain}"> ${stats[domain] ?  stats[domain]:'0' }</div></div>
      
        </div>
          <div class="collapsible-body ${getColor(domainCount)}">
            <ul class="collapsible">
              ${subDomainTemplate(cstopics[domain], selectedTopics, stats)}
            </ul>
          </div>
      </li>
      `;
      domainCount++;
  }

  hideLoader();

  showCount(selectedTopics.length);

  document.querySelector('#input').innerHTML = html;
  
  M.Collapsible.init(document.querySelectorAll('.collapsible'));
}

async function displayUser(auth){

  let {courses, name} = await getUser(auth.email, db);

  if(name !== 'Unkown'){
    document.querySelector('#fab').style.display = 'block';
  }

  let html=' <option disabled value="default" selected>Select Course</option>';
  
  for(let course in courses){
    html+=`<option>${course}</option>`;
  }
  const courseSelect = document.querySelector('#course');
  courseSelect.innerHTML = html;
  M.FormSelect.init(courseSelect);
  document.querySelector('#name').innerHTML = 'Welcome '+name+' V0.5';

  hideLoader();
 
}

firebase.auth().onAuthStateChanged((user) => {
  if (user){
    displayUser(user);
  }else{
    console.log('no auth found')
    // window.location.href="./index.html";
  }
}); 

async function validateAuth(){

  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    
    var email = window.localStorage.getItem('emailForSignIn');
    
    if(!email){
        email = window.prompt('Please provide your email for confirmation');
    }

    try{
      let auth  = await firebase.auth().signInWithEmailLink(email, window.location.href);

      window.localStorage.removeItem('emailForSignIn');
      
      if(auth.additionalUserInfo.isNewUser)
        showHelpModal()
      
    }catch(e){
      console.error(e);
      // window.location.href="./index.html";
    }

  }
}


validateAuth();
  


