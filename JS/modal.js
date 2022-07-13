function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalSubmitted = document.querySelector('.bground_submitted');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const form = document.querySelector('form');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
}
// Close Modal
function closeModal() {
  modalbg.style.display = 'none';
  modalSubmitted.style.display = 'none';
}

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', closeModal);
document.querySelector('.close-modal').addEventListener('click', closeModal);
document.querySelector('.close-x').addEventListener('click', closeModal);

// --- Form Validation ---

// First Name
function firstName() {
  let firstName = document.forms['reserve']['first'];
  if (
    firstName.value == '' ||
    firstName.value == null ||
    firstName.value.length < 2
  ) {
    formData[0].setAttribute('data-error-visible', 'true');
    addError(1, 'First Name is required', 'block');
    return false;
  } else {
    formData[0].setAttribute('data-error-visible', 'false');
    addError(1, '', 'none');
    return true;
  }
}
document.forms['reserve']['first'].addEventListener('blur', firstName);
document.forms['reserve']['first'].addEventListener('keyup', firstName);

// Last Name
function lastName() {
  let lastName = document.forms['reserve']['last'];
  if (
    lastName.value == '' ||
    lastName.value == null ||
    lastName.value.length < 2
  ) {
    formData[1].setAttribute('data-error-visible', 'true');
    addError(2, 'Last Name is required', 'block');
    return false;
  } else {
    formData[1].setAttribute('data-error-visible', 'false');
    addError(2, '', 'none');
    return true;
  }
}
document.forms['reserve']['last'].addEventListener('blur', lastName);
document.forms['reserve']['last'].addEventListener('keyup', lastName);

// Email Address using regex

function validateEmail() {
  let email = document.forms['reserve']['email'];
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailRegex.test(email.value)) {
    formData[2].setAttribute('data-error-visible', 'false');
    addError(3, '', 'none');
    return true;
  } else {
    formData[2].setAttribute('data-error-visible', 'true');
    addError(3, 'A valid email is required', 'block');
    return false;
  }
}
document.forms['reserve']['email'].addEventListener('change', validateEmail);
document.forms['reserve']['email'].addEventListener('keyup', validateEmail);

// Birthday validation using regex
function validateBithday() {
  let birthday = document.forms['reserve']['birthdate'];
  let birthdayRegex =
    /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/;
  if (birthday.value.match(birthdayRegex)) {
    formData[3].removeAttribute('data-error-visible');
    return true;
  } else {
    formData[3].setAttribute('data-error-visible', 'true');
    return false;
  }
}

// Validate Tournament Selection
function validateTournament() {
  let tournament = document.forms['reserve']['quantity'];
  if (tournament.value == '' || tournament.value == null) {
    formData[4].setAttribute('data-error-visible', 'true');
    addError(4, "Please don't leave empty", 'block');
    return false;
  } else {
    formData[4].setAttribute('data-error-visible', 'false');
    addError(4, '', 'none');
    return true;
  }
}
document.forms['reserve']['quantity'].addEventListener(
  'blur',
  validateTournament
);
document.forms['reserve']['quantity'].addEventListener(
  'keyup',
  validateTournament
);

// Validate Location Selection
function validateLocation() {
  let location = document.forms['reserve']['location'];
  let locationError = document.querySelector('.error');
  if (
    location[0].checked == false &&
    location[1].checked == false &&
    location[2].checked == false &&
    location[3].checked == false &&
    location[4].checked == false
  ) {
    locationError.style.border = '2px solid red';
    addError(5, 'Please select a location', 'block');
    return false;
  } else {
    locationError.style.border = '2px solid #279e7a';
    addError(5, '', 'none');
    return true;
  }
}

// Validate Terms
function validateTerms() {
  let terms = document.forms['reserve']['checkbox1'];
  if (terms.checked == false) {
    formData[6].setAttribute('data-error-visible', 'true');
    return false;
  } else {
    formData[6].setAttribute('data-error-visible', 'false');
    return true;
  }
}

// Validate Form
let criteriaCheck = false;

function validate() {
  if (
    firstName() &&
    lastName() &&
    validateEmail() &&
    validateBithday() &&
    validateTournament() &&
    validateLocation() &&
    validateTerms()
  ) {
    criteriaCheck = true;
    return true;
  } else {
    return false;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validate();
  if (criteriaCheck == true) {
    modalbg.style.display = 'none';
    modalSubmitted.style.display = 'block';
  }
});

function addError(errorNumber, errorMessage, display) {
  let p = document.querySelector('#error-message' + `${errorNumber}`);
  p.style.display = `${display}`;
  p.style.fontSize = '10px';
  p.style.fontFamily = 'Roboto';
  p.style.fontWeight = 'Regular';
  p.style.color = 'red';
  document.querySelector(
    '#error-message' + `${errorNumber}`
  ).innerHTML = `${errorMessage}`;
}
