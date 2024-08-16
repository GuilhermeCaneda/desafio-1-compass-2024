import { validateEmail } from "../../scripts/validation.js";

const inputGroupInputLorem = document.querySelector('#loremipsum-inputgroup-input');
const inputGroupButtonLorem = document.querySelector('#loremipsum-inputgroup-button');

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