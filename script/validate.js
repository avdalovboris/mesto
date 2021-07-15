class FormValidator {
  constructor(object, formModal) {
    this._formModal = formModal;
    this._input = object.input;
    this._inactiveButtonClass = object.buttonInActive;
    this._buttonDisabled = object.disabled;
    this._inputErrorClass = object.inputError;
    this._formButton = object.formButton,
    this._errorSpanActive = object.errorSpanActive

  }
  
  enableValidation() {
    this._formModal.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners()
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formModal.elements);
    this._buttonElement = this._formModal.querySelector(this._formButton);

    this.toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (el) => {
        el = inputElement
        this._isValid(el)
        this.toggleButtonState()
      })
    })
  }

  toggleButtonState() {
    if (!this._formModal.checkValidity()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute(this._buttonDisabled[0],[1]);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute(this._buttonDisabled[0]);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    console.log(errorElement)
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorSpanActive)
  }

  hideInputError(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorSpanActive)
  }

}

export default FormValidator;