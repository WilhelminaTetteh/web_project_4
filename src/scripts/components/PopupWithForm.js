import Popup from "../components/Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, popupSubmit) {
    super(popupSelector);
    this._submitHandler = this._submitHandler.bind(this);
    this._popupSubmit = popupSubmit;
  }

  _getInputValues() {
    const values = {};
    //search for all my inputs
    const inputs = Array.from(this._form.querySelectorAll(".form__input"));

    inputs.forEach((input) => {
      // take the value of its name attribute
      values[input.name] = input.value;
    });

    return values;
  }
  close() {
    super.close();
    this._form.reset();
  }
  _submitHandler(e) {
    e.preventDefault();
    const submittedValues = this._getInputValues();
    this._popupSubmit(submittedValues);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector(".form");
    this._form.addEventListener("submit", this._submitHandler);
  }
}
export default PopupWithForm;
