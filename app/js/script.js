<<<<<<< HEAD
=======
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
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
>>>>>>> 9345916b50cd7e38e28a2db398bbccda8c4735e5
