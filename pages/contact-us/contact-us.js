import { validateEmail, validateFormUser } from "../../scripts/validation.js";

const inputFirstName = document.querySelector('#form-registration-inputfirstname');
const inputLastName = document.querySelector('#form-registration-inputlastname');
const inputEmail = document.querySelector('#form-registration-inputemail');
const textAreaMessage = document.querySelector('#form-registration-textareamessage');
const form = document.querySelector('#form-registration');

const inputGroupInputLorem = document.querySelector('#loremipsum-inputgroup-input');
const inputGroupButtonLorem = document.querySelector('#loremipsum-inputgroup-button');


document.querySelectorAll('.socialmedia-link').forEach(link => {
    link.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        window.open(url, '_blank');
    });
});




inputGroupButtonLorem.addEventListener("click", (event) => {
    event.preventDefault();
    const inputEmailValue = inputGroupInputLorem.value.trim();
    const emailValidation = validateEmail(inputEmailValue);

    if(emailValidation.messages.length > 0){
        console.log("Failed to send email: ", emailValidation.messages)
    }else {
        console.log("Email is valid and ready to send.");
        inputGroupInputLorem.value = "";
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstNameValue = inputFirstName.value.trim();
    const lastNameValue = inputLastName.value.trim();
    const emailValue = inputEmail.value.trim();
    const messageValue = textAreaMessage.value.trim();
    const newUser = {id: generateUniqueId(), firstName: firstNameValue, lastName: lastNameValue, email: emailValue, message: messageValue};
    const userValidation = validateFormUser(newUser);

    if(userValidation.isValid){
        localStorage.setItem('formData', JSON.stringify(newUser));
        clearFields();
    }
    console.log(userValidation)
    listData();
});

const listData = () => {
    let data = localStorage.getItem('formData');
    if (data) {
        let formData = JSON.parse(data);
        console.log('Data: ', formData);
    } else {
        console.log('LocalStorage is empty.');
    }
}

const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 1);

const clearFields = () => {
    inputFirstName.value = "";
    inputLastName.value = "";
    inputEmail.value = "";
    textAreaMessage.value = "";
}