function editNav() {
  var x = document.getElementById('myTopnav');
  var y = document.getElementById('close-navbar');
  if (x.className === 'topnav') {
    x.className += ' responsive';
    y.className += 'close-div';
  } else {
    x.className = 'topnav';
    y.className = '';
  }
}
// Invisible Div to enable click away to close menu
function closeNav() {
  var x = document.getElementById('myTopnav');
  var y = document.getElementById('close-navbar');

  x.className = 'topnav';
  y.className = '';
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

// --- Form Validation --- //

// First Name
document.forms['reserve']['first'].addEventListener('blur', firstName);
document.forms['reserve']['first'].addEventListener('keyup', firstName);

function firstName() {
  let firstName = document.forms['reserve']['first'];
  let firstNameRegex =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  if (
    firstNameRegex.test(firstName.value) &&
    firstName.value.length > 2 &&
    firstName.value != ''
  ) {
    formData[0].setAttribute('data-error-visible', 'false');
    addError(1, '', 'none');
    return true;
  } else {
    formData[0].setAttribute('data-error-visible', 'true');
    addError(1, 'First Name is required', 'block');
    return false;
  }
}

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
document.forms['reserve']['email'].addEventListener('blur', validateEmail);
document.forms['reserve']['email'].addEventListener('keyup', validateEmail);

// Validate Birthday Date
const birthdate = document.getElementById('birthdate');
// Set Max date for Birthday
const today = new Date();
today.setFullYear(today.getFullYear() - 13);
birthdate.setAttribute('max', today.toISOString().substring(0, 10));
birthdate.addEventListener('change', validateBirthday);
birthdate.addEventListener('blur', validateBirthday);
birthdate.addEventListener('keyup', validateBirthday);

document.forms['reserve']['quantity'].addEventListener(
  'change',
  validateTournament
);
function validateBirthday() {
  const dateRegex =
    /^(?:(?:19[0-9]{2}|200[0-9]|2010)([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:19(?:0[48]|[2648][048]|[13579][26])|2000|200[48])([-/.]?)0?2\2(?:29))$/gm;
  if (!dateRegex.test(birthdate.value)) {
    console.log(birthdate.value);
    formData[3].setAttribute('data-error-visible', 'true');
    addError(4, 'You must be at least 13 years old', 'block');
    return false;
  } else {
    formData[3].setAttribute('data-error-visible', 'false');
    addError(4, '', 'none');
    return true;
  }
}

// Validate Tournament Selection
function validateTournament() {
  let tournament = document.forms['reserve']['quantity'];
  if (tournament.value == '' || tournament.value == null) {
    formData[4].setAttribute('data-error-visible', 'true');
    addError(5, 'This field cannot be empty', 'block');
    return false;
  } else {
    formData[4].setAttribute('data-error-visible', 'false');
    addError(5, '', 'none');
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
    validateBirthday() &&
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
  p.style.fontSize = '12px';
  p.style.fontFamily = 'Roboto';
  p.style.fontWeight = 'Regular';
  p.style.color = 'red';
  document.querySelector(
    '#error-message' + `${errorNumber}`
  ).innerHTML = `${errorMessage}`;
}
