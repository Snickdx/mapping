const users = {
  "snickdx@gmail.com":{
    courses:{
      "INFO 1601":['AL-01-01 - Differences among best, expected, and worst case behaviors of an algorithm '],
      "INFO 3601":[],
      "INFO 2602":[]
    },
    name:"Nicholas Mendez"
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

function getCourseTopics(email, course){
  if(!validateEmail(email))
    throw `${email} not recognized!`
  let topics = users[email].courses[course]; 
  if(!topics)
    throw `Unkown course ${course} for ${email}`;
  return topics;
}

function saveCourseTopics(email, course, topics){
  console.log(email, course, topics);
  if(!users[email])
    throw `${email} not recognized!`
  let key = users[email].courses[course]; 
  if(!key)
    throw `Unkown course ${course} for ${email}`;
  users[email].courses[course] = [...topics];
}


export {getUser, getCourseTopics, saveCourseTopics, validateEmail};