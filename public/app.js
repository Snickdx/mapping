import { cstopics, csdomains, cssubdomains } from './csmodule.js';
import { firebaseConfig } from './config.js';
import { getUser, getCourseTopics, saveCourseTopics } from './users.js';
import { debug, version } from './global.js';
import {registerSW} from './register.js';


if(!debug)
    registerSW();

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
let auth = firebase.auth().currentUser;


let selectedCourse = null;
let selectedCourseCode = null;
let unsubscribe = null;

const courses = {
  "COMP 1011 - Intro. to Information Technology I": null,
  "COMP 1600 - Introduction to Computing Concepts": null,
  "COMP 1601 - Computer Programming I": null,
  "COMP 1602 - Computer Programming II": null,
  "COMP 1603 - Computer Programming III": null,
  "COMP 1604 - Mathematics for Computing": null,
  "COMP 2601 - Computer Architecture": null,
  "COMP 2602 - Computer Networks": null,
  "COMP 2603 - Object Oriented Programming I": null,
  "COMP 2604 - Operating Systems": null,
  "COMP 2605 - Enterprise Database Systems": null,
  "COMP 2606 - Software Engineering": null,
  "COMP 2611 - Data Structures": null,
  "COMP 3601 - Design & Analysis of Algorithms": null,
  "COMP 3602 - Theory of Computing": null,
  "COMP 3603 - Human-Computer Interaction": null,
  "COMP 3605 - Introduction to Data Analytics": null,
  "COMP 3606 - Wireless and Mobile Computing": null,
  "COMP 3607 - Object-Oriented Programming II": null,
  "COMP 3608 - Intelligent Systems": null,
  "COMP 3609 - Game Programming": null,
  "COMP 3610 - Big Data Analytics": null,
  "COMP 3611 - Modelling and Simulation": null,
  "COMP 3612 - Special Topics in Computer Science": null,
  "COMP 3613 - Software Engineering II": null,
  "INFO 1600 - Introduction to Information Technology Concepts": null,
  "INFO 1601 - Introduction to WWW Programming": null,
  "INFO 2600 - Information Systems Development": null,
  "INFO 2601 - Networking Technologies Fundamentals": null,
  "INFO 2602 - Web Programming and Technologies I": null,
  "INFO 2603 - Platform Technologies I": null,
  "INFO 2604 - Information Systems Security": null,
  "INFO 2605 - Professional Ethics and Law": null,
  "INFO 3600 - Business Information Systems": null,
  "INFO 3601 - Platform Technologies II": null,
  "INFO 3602 - Web Programming and Technologies II": null,
  "INFO 3604 - Project": null,
  "INFO 3605 - Fundamentals of LAN Technologies": null,
  "INFO 3606 - Cloud Computing": null,
  "INFO 3607 - Fundamentals of WAN Technologies": null,
  "INFO 3608 - E-Commerce": null,
  "INFO 3609 - Internship I": null,
  "INFO 3610 - Internship II": null,
  "INFO 3611 - Database Administration for Professionals": null,
  "MATH 2250 - Industrial Mathematics": null
}

let stats = null;


db.enablePersistence()
  .catch((err) => {
    console.error(err);
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
      }
});


function subscribeToChanges(course){
  if(selectedCourse){

    loadForm(course);

    // unsubscribe = course.onSnapshot({ includeMetadataChanges: true}, (doc)=>{
    //   togglePending(doc.metadata.hasPendingWrites);
    //   selectedCourse = doc;
    //   loadForm(doc)
    // })
  }else{
    unsubscribe = () => console.log('no listener');
  }

}


async function getCourse(code){
  if(selectedCourse && code === selectedCourseCode)
    return Promise.resolve(selectedCourse);
  else{
    selectedCourseCode = code;
    let document = await db.collection('courses').doc(code).get(); 
    selectedCourse = document;
    return selectedCourse;
  }
}



//########################### Window Functions #########################

window.courseSelected = async function(code){
  selectedCourseCode = code;

  let course = await getCourse(selectedCourseCode);
  stats = course.data().stats;

  if(unsubscribe)
    unsubscribe();

  subscribeToChanges(course);

}

// window.updateCount = function(event){
//   const form = document.querySelector('#myform');
//   const data = new FormData(form);
//   for(let [key, value] of data.entries()){
//     console.log(key, value);
//   }
//   // const numTopics = selectedTopics.length;
//   // const topic = event.target.value;
//   // let array = topic.split('-');
//   // let domain = array[0].trim();
//   // let subdomain = `${domain}-${array[1].trim()}`;
  
//   // updateStatsUI(domain, event.target.checked);
//   // updateStatsUI(subdomain, event.target.checked);
//   // showPending(selectedTopics);
//   // showCount(numTopics);
// }


// window.selectTopics = async function(event){
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   const selected = formData.getAll('topics');
//   const course = document.querySelector("#course").value;
//   console.log(course);
//   let auth = firebase.auth().currentUser;
//   const fab =  document.querySelector('#fab');
  
//   fab.style.display = 'none';
//   showLoader();
//   await saveCourseTopics(auth.email, course, selected, db);
//   showPending([]);
//   hideLoader();
//   M.toast({
//     html: `<span>${selected.length} Topics saved to ${course} !</span><button class="btn-flat toast-action">Dismiss</button>`, 
//     completeCallback: function(){
//       fab.style.display = 'block';
//     }
//   });
// }

window.logout = async function(){
  console.log('Logging Out');
  await firebase.auth().signOut();
  window.location.href="./index.html";
}

// ########################## Module Functions #########################


function updateStatsUI(id){
  const elem = document.querySelector(`#${id}`); 
  elem.innerHTML = stats[id];

  if(stats[id] == 0){
    elem.classList.remove("green");
    elem.classList.remove("white-text");
  }else{
    elem.classList.add("green");
    elem.classList.add("white-text");
  }
  
}

function getColor(num){
  let color = [ 
    'red lighten', 
    'pink lighten', 
    'purple lighten', 
    'deep-purple lighten', 
    'indigo lighten', 
    'cyan lighten', 
    'teal lighten', 
    'green lighten', 
    'lime lighten'
  ];
  return color[num%color.length];
}

function showCount(num){
  document.querySelector('#count').innerHTML = `<div class="chip">${num} Topics Mapped</div>`;
}

function togglePending(isPending){
  const html = isPending ? `<div class="chip right yellow black-text">Pending Changes<i class="close material-icons">warning</i></div>` : '<div class="chip right green white-text">All Changes Saved<i class="close material-icons">check</i></div>';
  document.querySelector('#pending').innerHTML = html;          
}

function showHelpModal(){
}


function getIds(topic){
  const domainId = topic.split('-')[0];
  const subdomainId = domainId+"-"+topic.split('-')[1];
  return [domainId, subdomainId];
}

function updateStats(db, doc){

  const {mapping} = doc;

  for(let [topic, status] of Object.entries(mapping)){
      const [domainId, subdomainId] = getIds(topic);

      if(status === 'taught'){
          stats[domainId]++;
          stats[subdomainId]++;
          stats['total']++;
      }
          
  }

  return db.collection('courses').doc(doc.id).update({mapping, stats});
}

window.updateTopic = async function (topic, status){
  const { mapping } = selectedCourse.data();
  mapping[topic] = status;

  const [domainId, subdomainId] = getIds(topic);

  const prev = selectedCourse.data().mapping[topic];
  
  if(prev === "taught" && status !== "taught"){
    stats[domainId]--;
    stats[subdomainId]--;
  }else if(prev !== "taught" && status === "taught"){
    stats[domainId]++;
    stats[subdomainId]++;
  }

  await db.collection('courses').doc(selectedCourseCode).update(
    {
      mapping,
      stats
    }
  );

  updateStatsUI(domainId);
  updateStatsUI(subdomainId);

}

function topicsTemplate(subdomain){
  let html='';

  const {mapping} = selectedCourse.data();

  for(let topic of subdomain){
    const topicVal = `${topic.topicId} - ${topic.topic}`;
    html+=`
    <div class="row">
        <span class="col s9 offset-s2 black-text">${topicVal}</span>
    </div>
    <div class="row" >
      <div class="col offset-s2 s9">
      <label>
        <input class="with-gap" onclick="updateTopic('${topic.topicId}', 'taught')" ${mapping[topic.topicId] === "taught"? "checked" : ""} id="${topic.topicId}-taught" value="taught"  name="${topic.topicId}" type="radio"  />
        <span class="black-text">Taught</span>
      </label>
      <label>
        <input class="with-gap" onclick="updateTopic('${topic.topicId}', 'recommended')" ${mapping[topic.topicId] === "recommended"? "checked" : ""} id="${topic.topicId}-recommended" value="recommended" name="${topic.topicId}" type="radio"  />
        <span class="black-text">Should be Taught</span>
      </label>
      <label>
        <input class="with-gap" onclick="updateTopic('${topic.topicId}', 'not taught')" ${mapping[topic.topicId] === "not taught"? "checked" : ""} id="${topic.topicId}-not-taught" value="not-taught" name="${topic.topicId}" type="radio"  />
        <span class="black-text">Not Taught</span>
      </label>
      </div>
    </div>
    
    <hr>
    `;
  }

  return html;

}

function subDomainTemplate(domain, domainCount){
  let html='';

  for(let subdomain in domain){
    html+=`
        <li>
          <div class="collapsible-header ${getColor(domainCount)}-5">
            <div class="col s9 offset-s1">${subdomain} -  ${cssubdomains[subdomain]}</div>
            <div class="col s2"><div class="right chip${stats[subdomain] ? " green white-text" : "" }" id="${subdomain}"> ${stats[subdomain] ?  stats[subdomain]:'0' }</div></div>
          </div>
            <div class="collapsible-body ${getColor(domainCount)}-5">
              ${topicsTemplate(domain[subdomain])}                    
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
  let domainCount = 0;

  for(let domain in cstopics){

      html+=`
      <li>
        <div class="collapsible-header ${getColor(domainCount)}-4">
        <div class="col s10">${domain} - ${csdomains[domain]}</div>
        <div class="col s2"><div class="right chip ${stats[domain] > 0 ? "green white-text" : "" }"  id="${domain}"> ${stats[domain] > 0 ?  stats[domain]:'0' }</div></div>
      
        </div>
          <div class="collapsible-body ${getColor(domainCount)}-4">
            <ul class="collapsible">
              ${subDomainTemplate(cstopics[domain], domainCount)}
            </ul>
          </div>
      </li>
      `;
      domainCount++;
  }

  hideLoader();

  showCount(stats.total);

  document.querySelector('#input').innerHTML = html;
  
  M.Collapsible.init(document.querySelectorAll('.collapsible'));
}

async function displayUser(auth){

  let {name} = await getUser(auth.email, db);

  M.Autocomplete.init(document.querySelector('#course'), {
    data: courses,
    onAutocomplete: function(value){
      const course = value.split(' - ')[0].trim();
      window.courseSelected(course);
    }
  });
  
  
  document.querySelector('#name').innerHTML = 'Welcome '+name+' '+version;

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
  


