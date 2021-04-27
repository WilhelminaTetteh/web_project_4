class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  _showErrorMessage(input, inputValidationMessage) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = inputValidationMessage;
    input.classList.add(this._settings.inputErrorClass);
    error.classList.add(this._settings.errorClass);
  }
  _hideErrorMessage(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._settings.inputErrorClass);
    error.classList.remove(this._settings.errorClass);
  }
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      //SHOW ERROR
      this._showErrorMessage(input, input.validationMessage);
    } else {
      // HIDE ERROR
      this._hideErrorMessage(input);
    }
  }
  _isFormValid(inputs) {
    return inputs.every((input) => {
      return input.validity.valid;
    });
  }
  _toggleButtonState(button, inputs) {
    if (!this._isFormValid(inputs)) {
      button.disabled = true;
      button.classList.add(this._settings.inactiveButtonClass);
    } else {
      button.disabled = false;
      button.classList.remove(this._settings.inactiveButtonClass);
    }
  }
  _setEventListeners() {
    const inputs = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    const button = this._form.querySelector(
      this._settings.submitButtonSelector
    );
    this._toggleButtonState(button, inputs);

    this._form.addEventListener("reset", () => {
      inputs.forEach((input) => {
        this._hideErrorMessage(input); // clear the errors
      });
      button.disabled = true; //disable the button
      button.classList.add(this._settings.inactiveButtonClass);
    });

    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        this._checkInputValidity(input);
        this._toggleButtonState(button, inputs);
      });
    });
  }
  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    //call eventListeners
    this._setEventListeners();
  }
}

export default FormValidator;
