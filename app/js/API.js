//Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyC5JZd-879Uke3iSjaIZ2jSQTCZsRJS898",
    authDomain: "xgridzproject-16ea1.firebaseapp.com",
    databaseURL: "https://xgridzproject-16ea1.firebaseio.com",
    projectId: "xgridzproject-16ea1",
    storageBucket: "xgridzproject-16ea1.appspot.com",
    messagingSenderId: "946597094165",
    appId: "1:946597094165:web:f8cb84f7846b0461137f1c",
    measurementId: "G-X1W6BEPG3M"
};
// Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

var db = firebase.firestore();


async function fetchData() {
    const teacherCollection = db.collection('Users').doc('Teachers').collection('TeacherInfo');
    const teacherInfo = await teacherCollection.get();

    teacherInfo.forEach((doc => {
        console.log(doc.data());
    }))
}

// function fetchStudentInfo(id) {
//     const teacherCollection = db.collection('Users').doc('Teachers').collection('TeacherInfo');
//     const studentInfo = teacherCollection.collection(`${id}`).doc('StudentInfo');
//     studentInfo.get().then((doc) => {
//         console.log(doc.id, doc.data());
//     });
// }