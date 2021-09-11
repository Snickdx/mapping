import { getFirestore, enableIndexedDbPersistence, doc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore/lite';

async function getUser(email, db){

  const doc = await db.collection("users").doc(email).get();

  if(doc.exists){
    return doc.data();
  }

  return {
    name:"Unknown",
    courses: {}
  };
}

async function getCourseTopics(email, course, db){

  const doc = await db.collection("users").doc(email).get();

  if(doc.exists){
    return doc.data().courses[course];
  }
  
  return topics;
}

async function saveCourseTopics(email, course, topics, db){

  const doc = await db.collection("users").doc(email).get();

  if(!doc.exists)
    throw 'unkown email '+email;

  const newDoc = doc.data();
  
  newDoc['courses'][course] = topics;

  await db.collection('users').doc(email).set(newDoc);

}


export {getUser, getCourseTopics, saveCourseTopics};