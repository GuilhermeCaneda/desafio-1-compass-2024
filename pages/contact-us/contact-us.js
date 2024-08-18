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

    openModalError(userValidation.isValid, userValidation.errors)
    listData();
});




//-----------------------------------------------MODAL-----------------------------------------------

const modal = document.getElementById("modal");
const cancelModalButton = document.getElementsByClassName("cancel-modal")[0];

function displayErrors(response) {
  const modalErrorsContainer = document.querySelector('.modal-errors');
  modalErrorsContainer.innerHTML = '';
  response.forEach(errorItem => {
    const errorCard = document.createElement('div');
    errorCard.classList.add('modal-errors-card');
    
    const fieldTitle = document.createElement('h3');
    fieldTitle.classList.add('modal-errors-fieldname');
    fieldTitle.textContent = errorItem.field;
    
    const errorMessagesContainer = document.createElement('div');
    errorMessagesContainer.classList.add('modal-errors-messages');
    
    errorItem.messages.forEach(errorMsg => {
      if (errorMsg) { 
        const errorMessage = document.createElement('p');
        errorMessage.textContent = errorMsg;
        errorMessagesContainer.appendChild(errorMessage);
      }
    });
    
    errorCard.appendChild(fieldTitle);
    errorCard.appendChild(errorMessagesContainer);
    modalErrorsContainer.appendChild(errorCard);
  });
}


function openModalError(isValid, errors) {
  const modalTitle = document.querySelector('#modal .modal-container h2');
  if(isValid===true){
    modalTitle.textContent = "Your submission was a hit! Thanks for your input. We’ll be in touch soon!";
  }else{
    modalTitle.textContent = "Form submission failed. Please fill out all required fields correctly.";
    displayErrors(errors);
  }
  document.getElementById('modal').style.display = 'block';
  document.body.classList.add('modal-open'); 
}

cancelModalButton.addEventListener("click", () => {
  const modalErrorsContainer = document.querySelector('.modal-errors');
  modalErrorsContainer.innerHTML = '';
  document.getElementById('modal').style.display = 'none';
  document.body.classList.remove('modal-open'); 
});

//-----------------------------------------------MODAL-----------------------------------------------