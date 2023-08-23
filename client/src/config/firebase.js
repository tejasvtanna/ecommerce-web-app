import firebase from 'firebase'

// const firebaseConfig = {
//   // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   // appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyBhq7S36U6BraF4Sul9PtZ4omxS-i5By9Y',
  authDomain: 'little-tags-theta.firebaseapp.com',
  projectId: 'little-tags-theta',
  storageBucket: 'little-tags-theta.appspot.com',
  messagingSenderId: '534440241239',
  appId: '1:534440241239:web:e44a7d8cdfd69dd9ba9b12',
  measurementId: 'G-6H9VE1CHSF',
}

const myApp = firebase.initializeApp(firebaseConfig)

export const auth = myApp.auth()

// export const db = myApp.firestore()
// export const storage = myApp.storage()

export const facebookProvider = new firebase.auth.FacebookAuthProvider()
facebookProvider.setCustomParameters({
  display: 'popup',
})
