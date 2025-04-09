function showInputError(formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
}

function hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = "";
}

function isValid(formElement, inputElement, obj) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, obj);
  } else {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      obj
    );
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(obj.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(obj.inactiveButtonClass);
  }
}

function setEventListener(formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
}

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault;
    });
    setEventListener(formElement, obj);
  });
}

function clearValidation(formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, obj);
  });
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, obj);
}

export { enableValidation, clearValidation };
