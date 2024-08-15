import { validateFormUser } from "../../scripts/validation.js";

const inputFirstName = document.querySelector('#form-registration-inputfirstname');
const inputLastName = document.querySelector('#form-registration-inputlastname');
const inputEmail = document.querySelector('#form-registration-inputemail');
const textAreaMessage = document.querySelector('#form-registration-textareamessage');
const form = document.querySelector('#form-registration');

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
        //console.log("Added ", newUser);
        console.log(userValidation)
        clearFields();
    }else{
        console.log(userValidation)
    }
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