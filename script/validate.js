  
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.add(config.inputError);
  errorElement.textContent = errorMessage
  errorElement.classList.add(config.errorSpanActive)
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)

  inputElement.classList.remove(config.inputError);
  errorElement.classList.remove(config.errorSpanActive);
  errorElement.textContent = ''
}

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config)
  } else {
    hideInputError(formElement, inputElement, config)
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.input));
  const buttonElement = formElement.querySelector(config.button)
  
  toggleButtonState(inputList, buttonElement, config)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () =>{
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config)
    });
  }); 
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.form));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement, config)
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.buttonActive);
    buttonElement.setAttribute(config.disabled[0],[1])
  } else {
    buttonElement.removeAttribute(config.disabled[0]);
    buttonElement.classList.remove(config.buttonActive);
  } 
}

enableValidation({
  form: '.popup__form',
  input: '.popup__field',
  inputError: 'popup__field_error',
  button: '.popup__button',
  buttonActive: 'popup__button_inactive',
  disabled: ['disabled', 'true'],
  errorSpanActive: 'error__active'
})