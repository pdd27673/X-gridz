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

//database var
var db = firebase.firestore();

//Main variables
const teacherCollection = db.collection('Users').doc('Teachers').collection('TeacherInfo');
var teacherID = [];
var grades = [];

//Fetch every teachers
//store in teacherID array
async function fetchData() {
    const teacherInfo = await teacherCollection.get();
    teacherInfo.forEach((doc => {
        teacherID.push(doc.id);
    }));
}

//Fetch every ID in teacherID
//For student information
//Store info of < 60% in variable
async function fetchStudentData() {
    teacherID.forEach(async function (id) {
        const studentCollection = teacherCollection.doc(`${id}`).collection('StudentInfo');
        const studentInfo = await studentCollection.get();

        //for each ID pull up corresponding student
        studentInfo.forEach(async function (doc)  {
            let name = doc.get("lastName");
            let student = []
            student.push(name)
            const quizCollection = studentCollection.doc(`${doc.id}`).collection('QuizInfo');
            const quizInfo = await quizCollection.get();

            quizInfo.forEach((quiz => {
                    student.push(quiz.get('grade'))
            }))
            if(student[1] <= .6 || student[2] <= .6 ){
                grades.push(student)
            }
        });
        
    });

    grades.forEach((entry => {
        console.log(entry);
    }))
}
