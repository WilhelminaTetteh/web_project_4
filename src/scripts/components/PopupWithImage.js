import Popup from "../components/Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(link, text) {
    super.open();
    const image = this._popup.querySelector(".modal__image");
    const caption = this._popup.querySelector(".modal__image-caption");

    image.src = link;
    caption.textContent = text;
  }
}
export default PopupWithImage;
