import { doc, setDoc, getDoc } from 'firebase/firestore';

async function getUser(email, db){

  const userdoc = await getDoc(doc(db, "users", email)); 

  if(userdoc.exists()){
    return doc.data();
  }

  return {
    name:"Unknown",
    courses: {}
  };
}

async function getCourseTopics(email, course, db){

  const userdoc = await getDoc(doc(db, "users", email)); 

  if(userdoc.exists()){
    return doc.data().courses[course];
  }
  
  return topics;
}

async function saveCourseTopics(email, course, topics, db){

  const userdoc = await getDoc(doc(db, "users", email)); 

  if(!userdoc.exists())
    throw 'unkown email '+email;

  const newDoc = doc.data();
  
  newDoc['courses'][course] = topics;

  setDoc(doc(db, 'users', email), newDoc);

}


export {getUser, getCourseTopics, saveCourseTopics};