const listErrors = [
  {
    field: "PRIMEIRO ELEMENTO",
    errors: ["PRIMEIRA MENSAGEM", "string 2", "string 3"],
  },
  { field: "name2", errors: ["string 1", "string 2", ""] },
  { field: "name2", errors: ["string 1", "string 2", ""] },
  { field: "name2", errors: ["string 1", "string 2", ""] },
  {
    field: "name",
    errors: [
      "stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring 1",
      "string 2",
      "string 3",
    ],
  },
  { field: "name2", errors: ["string 1", "string 2", ""] },
  { field: "name2", errors: ["string 1", "string 2", ""] },
  { field: "name", errors: ["string 1", "string 2", "string 3"] },
  { field: "name2", errors: ["string 1", "string 2", ""] },
  {
    field: "ULTIMO ELEMENTO",
    errors: ["string 1", "string 2", "ULTIMA MENSAGEM"],
  },
];

openModalError(true, []);
openModalError(false, listErrors);

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
