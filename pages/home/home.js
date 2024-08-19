import { validateEmail } from "../../scripts/validation.js";

const inputGroupInputLorem = document.querySelector(
  "#loremipsum-inputgroup-input"
);
const inputGroupButtonLorem = document.querySelector(
  "#loremipsum-inputgroup-button"
);

inputGroupButtonLorem.addEventListener("click", (event) => {
  event.preventDefault();
  const inputEmailValue = inputGroupInputLorem.value.trim();
  const responseEmailValidation = validateEmail(inputEmailValue);
  const resultEmailValidation = {
    isValid: responseEmailValidation.messages.length === 0,
    errors: [responseEmailValidation],
  };

  if (responseEmailValidation.messages.length <= 0) {
    inputGroupInputLorem.value = "";
  }

  openModalError(resultEmailValidation.isValid, resultEmailValidation.errors);
});

//-----------------------------------------------MODAL-----------------------------------------------

const modal = document.getElementById("modal");
const cancelModalButton = document.getElementsByClassName("cancel-modal")[0];

function displayErrors(response) {
  const modalErrorsContainer = document.querySelector(".modal-errors");
  modalErrorsContainer.innerHTML = "";
  response.forEach((errorItem) => {
    const errorCard = document.createElement("div");
    errorCard.classList.add("modal-errors-card");

    const fieldTitle = document.createElement("h3");
    fieldTitle.classList.add("modal-errors-fieldname");
    fieldTitle.textContent = errorItem.field;

    const errorMessagesContainer = document.createElement("div");
    errorMessagesContainer.classList.add("modal-errors-messages");

    errorItem.messages.forEach((errorMsg) => {
      if (errorMsg) {
        const errorMessage = document.createElement("p");
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
  const modalTitle = document.querySelector("#modal .modal-container h2");
  if (isValid === true) {
    modalTitle.textContent =
      "Your submission was a hit! Thanks for your input. We’ll be in touch soon!";
  } else {
    modalTitle.textContent =
      "Form submission failed. Please fill out all required fields correctly.";
    displayErrors(errors);
  }
  document.getElementById("modal").style.display = "block";
  document.body.classList.add("modal-open");
}

cancelModalButton.addEventListener("click", () => {
  const modalErrorsContainer = document.querySelector(".modal-errors");
  modalErrorsContainer.innerHTML = "";
  document.getElementById("modal").style.display = "none";
  document.body.classList.remove("modal-open");
});

//-----------------------------------------------MODAL-----------------------------------------------
