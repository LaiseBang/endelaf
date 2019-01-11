"use strict"

function btnRadio(x) {
    if (x == 0) {
        document.getElementById("btnSubmitDonation").style.display = "block";
        document.getElementById("mobile-pay-confirm").style.display = "none";
        document.getElementById("swip").style.display = "none";
    } else {
        document.getElementById("btnSubmitDonation").style.display = "none";
        document.getElementById("mobile-pay-confirm").style.display = "block";
        document.getElementById("swip").style.display = "block";
        return;
    }
}

const danNr = document.querySelector("#dankort-nr");
const danExpMon = document.querySelector("#dankort-exp-month");
const danExpYear = document.querySelector("#dankort-exp-year");
const control = document.querySelector("#control");
const mobPay = document.querySelector("#mobile-pay-nr");

const att = document.createAttribute("required");
const attEM = document.createAttribute("required");
const attEY = document.createAttribute("required");
const attC = document.createAttribute("required");
const attMobilepay = document.createAttribute("required");

// show dankort / visa fields
function show1() {
    document.getElementById('div1').style.display = 'block';
    document.getElementById('div2').style.display = 'none';
    // add required to Dankort/ Visa
    danNr.setAttributeNode(att);
    danExpMon.setAttributeNode(attEM);
    danExpYear.setAttributeNode(attEY);
    control.setAttributeNode(attC);
    // remove required from mobilepay
    mobPay.removeAttributeNode(attMobilepay);
}

// show mobilpay 
function show2() {
    document.getElementById('div1').style.display = 'none';
    document.getElementById('div2').style.display = 'block';
    // add required to mobilepay
    mobPay.setAttributeNode(attMobilepay);
    // remove required from Dankort / Visa
    danNr.removeAttributeNode(att);
    danExpMon.removeAttributeNode(attEM);
    danExpYear.removeAttributeNode(attEY);
    control.removeAttributeNode(attC);

}
