const formReg = document.getElementById('formReg');
const formLogIn = document.getElementById('formLog');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');
const message2 = document.getElementById('message2');
const loginLink = document.getElementById('loginLink');
const regLink = document.getElementById('regLink');
const login = document.getElementById('login');
const register = document.getElementById('register');
const userInfo = document.getElementById('userInfo');

const infoName = document.getElementById('info-name');
const infoEmail = document.getElementById('info-email');
const infoPhone = document.getElementById('info-phone');
const infoWebsite = document.getElementById('info-website');

let isValid = false;
let passwordsMatch = false;

function validateForm() {
  // Use HTML constraint API to check form validity
  isValid = formReg.checkValidity();
  // If the form isn't valid
  if (!isValid) {
    // Style main message for an error
    message.textContent = 'Please fill out all fields.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    return;
  }
  // Check to see if both password fields match
  if (password1El.value === password2El.value) {
    // If they match, set value to true and borders to green
    passwordsMatch = true;
  } else {
    // If they don't match, border color of input to red, change message
    passwordsMatch = false;
    message.textContent = 'Make sure passwords match.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    password1El.style.borderColor = 'red';
    password2El.style.borderColor = 'red';
    return;
  }
  // If form is valid and passwords match
  if (isValid && passwordsMatch) {
    // Style main message for success
    message.textContent = 'Successfully Registered!';
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
  }
}

function checkLogIn() {
  const user = {
    email: formLogIn.email.value,
    password: formLogIn.password.value
  }
  // Do something with user login data
  const getUser = JSON.parse(localStorage.getItem('user'));

  // Hash Password
  const userPassHas = generateHash(user.password)

  // Check if user exist
  if (getUser === null) {
    message2.textContent = 'Email dose not exist';
  } else if (user.email === getUser.email && userPassHas === getUser.password) {
    infoName.textContent = getUser.name;
    infoPhone.textContent = getUser.phone;
    infoEmail.textContent = getUser.email;
    infoWebsite.textContent = getUser.website;
    clearInputs();
    userLogIn();
  } else {
    message2.textContent = 'Password or Username is incorrect, please try again';
    formLogIn.password.value = '';
  }
}

// Functions
function storeFormData() {
  const user = {
    name: formReg.name.value,
    phone: formReg.phone.value,
    email: formReg.email.value,
    website: formReg.website.value,
    password: formReg.password.value,
  };

  // Do something with user data
  user.password = generateHash(user.password)
  localStorage.setItem('user', JSON.stringify(user));
  clearInputs();
}

// Form processes
function processSignUpFormData(e) {
  e.preventDefault();
  // Validate Form
  validateForm();
  // Submit Form if Valid
  if (isValid && passwordsMatch) {
    storeFormData();
  }
}

function processLogInData(e) {
  e.preventDefault();
  checkLogIn();
}

function logOut() {
  clearUserInfo();
  goToLogin();
}

function removeAccount() {
  // Check if user really wants account removed
  if(confirm('Are you sure you want to remove this account?')) {
    localStorage.removeItem('user');
    clearUserInfo();
    goToRegister();
  }
}

// Hash generator
function generateHash(string) {
  var hash = 0;
  if (string.length == 0)
      return hash;
  for (let i = 0; i < string.length; i++) {
      var charCode = string.charCodeAt(i);
      hash = ((hash << 7) - hash) + charCode;
      hash = hash & hash;
  }
  return hash;
}

// clear form input
function clearInputs() {
  formReg.name.value = '';
  formReg.phone.value = '';
  formReg.email.value = '';
  formReg.website.value = '';
  formReg.password.value = '';
  formReg.password1.value = '';

  formLogIn.email.value = '';
  formLogIn.password.value = '';
}

function clearUserInfo() {
  infoName.textContent = '';
  infoPhone.textContent = '';
  infoEmail.textContent = '';
  infoWebsite.textContent = '';
}

// Event Listener
formReg.addEventListener('submit', processSignUpFormData);
formLog.addEventListener('submit', processLogInData);

// Switch Screen
function goToLogin() {
  login.style.display = 'inline';
  register.style.display = 'none';
  userInfo.style.display = 'none'
}

function goToRegister() {
  login.style.display = 'none';
  register.style.display = 'inline';
  userInfo.style.display = 'none'
  message.textContent = '';
  password1El.style.borderColor = 'red';
  password2El.style.borderColor = 'red';
}

function userLogIn() {
  login.style.display = 'none';
  userInfo.style.display = 'inline';
  message2.textContent = '';
}
