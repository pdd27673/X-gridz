// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: 'AIzaSyCswKDgCjyzh-8_W4VbHUAVksOlerNnvr0',
	authDomain: 'xgridz-d6e33.firebaseapp.com',
	databaseURL: 'https://xgridz-d6e33.firebaseio.com',
	projectId: 'xgridz-d6e33',
	storageBucket: 'xgridz-d6e33.appspot.com',
	messagingSenderId: '122306243430',
	appId: '1:122306243430:web:48dd3752e67c48d52676a7',
	measurementId: 'G-TDK0YNY4EQ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();

function signUp() {
	var email = document.getElementById('email');
	var password = document.getElementById('password');

	const promise = auth.createUserWithEmailAndPassword(
		email.value,
		password.value
	);
	promise.catch((e) => alert(e.message));

	alert('Signed Up');
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


// auth.onAuthStateChanged(function (user) {
// 	if (user) {
// 		var email = user.email;
// 		alert('Active User ' + email);

// 		window.location.replace('/teacher-dashboard.html');
// 	} else {
// 		alert('No Active User');
// 		//no user is signed in
// 	}
// });
