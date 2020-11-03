// Your web app's Firebase configuration
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

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
/** Sign Up Page **/

///Signing up with google 
function googleSignUp() {
	auth.signInWithPopup(provider);
	auth.onAuthStateChanged(user => {
        userDetails.innerHTML = `<h3>Email Owner: ${user.name}!</h3> <p>Owner's Email: ${user.email}</p>`;
		
	});
}


const db = firebase.firestore();
function signUp() {
    // Users First and Last Name
	var username = document.getElementById('name');

	auth.onAuthStateChanged(user => {
		if(user) {

			studentQuery = db.collection("Users").doc("Students").collection("StudentInfo").where("email", "==", user.email);
			teacherQuery = db.collection("Users").doc("Teachers").collection("TeacherInfo").where("email", "==", user.email);
			
			studentQuery.get().then(function (querySnapshot) {
				if(querySnapshot.empty){
					teacherQuery.get().then(function (querySnapshot){
						if(querySnapshot.empty){
							/*********Adding User Data to Firestore**********/

							// if user is a Student
							if(document.getElementById('StudentType').checked) {
								db.collection("Users").doc("Students").collection("StudentInfo").add({
									name: username.value,
									email: user.email
								});
								alert('Signed Up as Student');
							}
				
								// If the user is a Teacher 
							else if(document.getElementById('TeacherType').checked){
								db.collection("Users").doc("Teachers").collection("TeacherInfo").add({
									name: username.value,
									email: user.email
								});
								alert('Signed Up as Teacher');
						   }


						}else{
							alert('Account already exist, choose differnt email');
						}
					}) // teacherQuery 
				}else{
					alert('Account already exist, choose differnt email');
				}
			 })// studentQuery 
		
		}
		
	});

}
async function doSomething(querySnapshot) {
    let result = await functionThatReturnsPromiseA(!querySnapshot);
    return result;
}

async function functionThatReturnsPromiseA(querySnapshot) {
	return !querySnapshot.empty
}


function signOut() {
	auth.signOut();
	alert('Signed Out');

	window.location = '/index.html';
}


/*****Teacher dashboard*****/

//Teacher Addding Student 
function addStudent(){
    document.querySelector('.bg-model').style.display='flex';
}
function closePopUp(){
    document.querySelector('.bg-model').style.display='none';
}


 /*auth.onAuthStateChanged(function (user) {
 	if (user) {
 		var email = user.email;
 		alert('Active User ' + email);

 		window.location.replace('/teacher-dashboard.html');
 	} else {
 		alert('No Active User');
 		//no user is signed in
 	}
 }); */
