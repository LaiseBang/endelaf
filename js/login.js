'use strict'


// Get elements
const txt_email = document.getElementById("txt_email");
const txt_password = document.getElementById("txt_password");
// button that opens the form
//const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout"); // MOCK-UP knap skal slettes
// // button that send the form
const btnSubmitLogIn = document.getElementById("btnSubmitLogIn");

let id;
let email;
let pass;
let auth;
//let promise;

//Add login event
btnSubmitLogIn.addEventListener('click', e => {
    e.preventDefault();
    //Get email and pass
    email = txt_email.value;
    pass = txt_password.value;
    auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

})
//Add realtime listner
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        localStorage.setItem("uId", firebaseUser.uid);
        id = firebaseUser.uid;

    } else {
        console.log("not logged in");
    }
    checkAdmin();

})

// @TO-DO KAN DEN LAVES ANDERLEDES? HVIS MAN KLIKKER TILBAGE KNAPPEN PÅ DEN NYE SIDE BLIVER DEN VED MED AT REDIRECTE TIL DEN NYE SIDE
function checkAdmin() {
    // if user is admin go to dashboard.html else donation.html
    if (id === "P4sMSboWYhXKhCWKk0jVzEcgRdD2") {
        console.log("Admin");
        document.location.href = 'dashboard.html';
    } else if (id == null) {
        console.log("user = null");

    } else if (id !== "P4sMSboWYhXKhCWKk0jVzEcgRdD2") {
        console.log("Normal user");
        document.location.href = 'donation.html';
    }
}
