import Popup from "../components/Popup.js";
class PopupAlert extends Popup {
  constructor(popupSelector, popupConfirmation) {
    super(popupSelector);
    this._popupConfirmation = popupConfirmation;
    this.deletePermission();
  }

  deletePermission() {
    const deleteConfirmation = document.querySelector(
      ".form__delete-confirmation"
    );
    deleteConfirmation.addEventListener("click", this._popupConfirmation);
  }
}
export default PopupAlert;
