// import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'

// // const app =firebase.initializeApp({
// //     apiKey: "AIzaSyCtC10ZqfwacbSqcj5mr1ddSniPN0XtWN4",
// //   authDomain: "tokish2402.firebaseapp.com",
// //   projectId: "tokish2402",
// //   storageBucket: "tokish2402.appspot.com",
// //   messagingSenderId: "72327570119",
// //   appId: "1:72327570119:web:520ba6f53c969b636fd4e2"
// // })
// // export const auth=app.auth()
// // export default app

// // import firebase from 'firebase/compat/app'
// // import 'firebase/compat/auth'

// // import 'firebase';
// import * as admin from 'firebase-admin';

// const firstConfig =firebase.initializeApp ({
//     apiKey: "AIzaSyCtC10ZqfwacbSqcj5mr1ddSniPN0XtWN4",
//     authDomain: "tokish2402.firebaseapp.com",
//     projectId: "tokish2402",
//     storageBucket: "tokish2402.appspot.com",
//     messagingSenderId: "72327570119",
//     appId: "1:72327570119:web:520ba6f53c969b636fd4e2"
// });

// const secondConfig = admin.initializeApp({
//     apiKey: "AIzaSyBEK-65hZ0DOzFqzziPkxyhVzHcj2ryB6U",
//   authDomain: "aishmovie.firebaseapp.com",
//   projectId: "aishmovie",
//   storageBucket: "aishmovie.appspot.com",
//   messagingSenderId: "35555152815",
//   appId: "1:35555152815:web:00303eee3ac8ed22ae155a"
// });

// export const user = firstConfig;
// export const Admin = secondConfig;



import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig1 = {
  apiKey: "AIzaSyCtC10ZqfwacbSqcj5mr1ddSniPN0XtWN4",
  authDomain: "tokish2402.firebaseapp.com",
  projectId: "tokish2402",
  storageBucket: "tokish2402.appspot.com",
  messagingSenderId: "72327570119",
  appId: "1:72327570119:web:520ba6f53c969b636fd4e2"
};

const firebaseConfig2 = {
  apiKey: "AIzaSyBEK-65hZ0DOzFqzziPkxyhVzHcj2ryB6U",
  authDomain: "aishmovie.firebaseapp.com",
  projectId: "aishmovie",
  storageBucket: "aishmovie.appspot.com",
  messagingSenderId: "35555152815",
  appId: "1:35555152815:web:00303eee3ac8ed22ae155a"
};

const app1 = firebase.initializeApp(firebaseConfig1, "your-first-firebase-app");
const app2 = firebase.initializeApp(firebaseConfig2, "your-second-firebase-app");

export const user = app1.auth();
export const Admin = app2.auth();