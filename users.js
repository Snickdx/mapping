const users = {
  "snickdx@gmail.com":{
    courses:{
      "INFO 1601":[],
      "INFO 3601":[],
      "INFO 2602":[]
    },
    name:"Nicholas Mendez"
  },
  "kris.manohar@sta.uwi.edu":{
    courses:{
      "COMP 1600":[]
    },
    name:"Kris Manohar"
  },
  "shareeda.mohammed@sta.uwi.edu":{
    courses:{
      "COMP 1601":[]
    },
    name:"Shareeda Mohammed"
  },
  "phaedra.mohammed@sta.uwi.edu":{
    courses:{
      "COMP 3607":[]
    },
    name:"Phaedra Mohammed"
  }
};

function validateEmail(email){
  return users[email] !== undefined;
}

function getUser(email){
  if(!validateEmail(email))
    throw `${email} not recognized!`
  return users[email];
}

function toArray(){

}

async function getCourseTopics(email, course, db){
  if(!validateEmail(email))
    throw `${email} not recognized!`

  let topics = users[email].courses[course]; 

  if(!topics)
    throw `Unkown course ${course} for ${email}`;

  const doc = await db.collection("users").doc(email).get();

  if(doc.exists){
    return doc.data().courses[course];
  }
  
  return topics;
}

async function saveCourseTopics(email, course, topics, db){
  let doc = users[email]; 

  if(!doc)
    throw `${email} not recognized!`
  let key = doc.courses[course]; 
  if(!key)
    throw `Unkown course ${course} for ${email}`;
  users[email].courses[course] = [...topics];


  await db.collection('users').doc(email).set(doc);

}


export {getUser, getCourseTopics, saveCourseTopics, validateEmail};