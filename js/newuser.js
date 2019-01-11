'use strict'

let signupForm = document.querySelector("#signup-form");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let signupButton = document.querySelector("#signup");
const firstName = document.querySelector("#txt_fornavn");
const lastName = document.querySelector("#txt_efternavn");
const adress = document.querySelector("#txt_adresse");
const zipCode = document.querySelector("#txt_postnr");
const city = document.querySelector("#txt_by");
// listen for submit - form
signupForm.addEventListener('submit', submitUserData);

function clickSignupButton() {
    //signup firebase method
    auth.createUserWithEmailAndPassword(email.value, password.value).
        then(function (user) {
            console.log(auth.currentUser.email);
            document.location.href = '../pages/donation.html';
        }, function (error) {
            console.log(error.message);
        });
}

const dbUserRef = firebase.database().ref('users')

function submitUserData(e) {
    e.preventDefault();
    //get values
    let firstname_val = getInputValues('txt_fornavn');
    let lastname_val = getInputValues('txt_efternavn');
    let adress_val = getInputValues('txt_adresse');
    let postnr_val = getInputValues('txt_postnr');
    let by_val = getInputValues('txt_by');
    let email_val = getInputValues('email');
    let phone_val = getInputValues('txt_telefon');
    saveUser(firstname_val, lastname_val, adress_val, postnr_val, by_val, email_val, phone_val);
}

// get input values
function getInputValues(id) {
    return document.getElementById(id).value;
}

// save User to db
function saveUser(firstname_val, lastname_val, adress_val, postnr_val, by_val, email_val, phone_val) {
    let newdbUserRef = dbUserRef.push();
    newdbUserRef.set({
        fornavn: firstname_val,
        efternavn: lastname_val,
        adresse: adress_val,
        postnr: postnr_val,
        by: by_val,
        email: email_val,
        telefon: phone_val,
    })
    clickSignupButton();
}

// automatic fill in of city

let zipCodeArray = [];
// listen for entering of value
zipCode.addEventListener('input', getCityByZip);

function getCityByZip() {
    // get json
    fetch("../js/postnummer.json")
        .then(data => data.json())
        .then(d => {
            zipCodeArray = d;
            // get zip code value that user have entered
            let userInputNr = zipCode.value;
            // find object with that zip code in json fil
            zipCodeArray.forEach(findMatch);

            function findMatch(objects, i) {
                // find city in that object
                if (Number(userInputNr) === objects.Postnr) {
                    zipCode.className = "true";
                    // display city on screen
                    city.textContent = zipCodeArray[i].Bynavn;
                    console.log(city.textContent);



                    city.setAttribute(zipCodeArray[i].Bynavn);
                    document.body.appendChild(city);


                }
            }
        }
        )
}

// ---------- Remove asterisk when field is filled -------------
// listen for input
firstName.addEventListener('input', removeAsterisk);
lastName.addEventListener('input', removeAsterisk);
adress.addEventListener('input', removeAsterisk);
zipCode.addEventListener('input', removeAsterisk);
city.addEventListener('input', removeAsterisk);
email.addEventListener('input', removeAsterisk);
password.addEventListener('input', removeAsterisk);

// hide Asterisk
function removeAsterisk(input) {
    if (this.input = input) {
        let nextSibling = this.nextSibling.nextSibling;
        nextSibling.style.visibility = "hidden";
    };

}

