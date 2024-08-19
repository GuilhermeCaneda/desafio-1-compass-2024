export const validateFormUser = ({ firstName, lastName, email, message }) => {
  let isValid = true;
  let errors = [];

  const response_validationFirstName = validateFirstName(firstName);
  const response_validationLastName = validateLastName(lastName);
  const response_validationEmail = validateEmail(email);
  const response_validationMessage = validateMessage(message);

  if (response_validationFirstName.messages.length > 0) {
    isValid = false;
    errors.push(response_validationFirstName);
  }
  if (response_validationLastName.messages.length > 0) {
    isValid = false;
    errors.push(response_validationLastName);
  }
  if (response_validationEmail.messages.length > 0) {
    isValid = false;
    errors.push(response_validationEmail);
  }
  if (response_validationMessage.messages.length > 0) {
    isValid = false;
    errors.push(response_validationMessage);
  }

  return { isValid, errors };
};

export const validateFirstName = (firstName) => {
  let errors = [];
  if (firstName === "" || firstName == null) {
    errors.push("First name is required.");
  }
  if (firstName.length < 5) {
    errors.push("First name must be at least 5 characters long.");
  }

  return { field: "First Name", messages: errors };
};

export const validateLastName = (lastName) => {
  let errors = [];
  if (lastName === "" || lastName == null) {
    errors.push("Last name is required.");
  }
  if (lastName.length < 5) {
    errors.push("Last name must be at least 5 characters long.");
  }

  return { field: "Last Name", messages: errors };
};

export const validateEmail = (email) => {
  let errors = [];

  if (email === "" || email == null) {
    errors.push("Email is required.");
  }
  if (email.length < 6) {
    errors.push("Email must be at least 6 characters long.");
  }
  if (!validateEmailRegex(email)) {
    errors.push("Invalid email format.");
  }

  return { field: "Email", messages: errors };
};

export const validateMessage = (message) => {
  let errors = [];
  if (message === "" || message == null) {
    errors.push("Message is required.");
  }

  return { field: "Message", messages: errors };
};

export const validateEmailRegex = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
