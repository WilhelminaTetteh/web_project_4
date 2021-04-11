class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  } //popup_type_edit

  open() {
    document.addEventListener("keydown", this._handleEscClose);

    this._popup.classList.add("modal_open");
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);

    this._popup.classList.remove("modal_open");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal__button") ||
        evt.target.classList.contains("modal")
      )
        this.close();
    });
  }
}

export default Popup;
