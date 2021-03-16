import {
  imageModal,
  popupImage,
  imageCaption,
  openPopup,
  closePopup,
  closeByEscape,
} from "./utils.js";

class Card {
  constructor(data, cardTemplateSelector) {
    this._data = data;
    this._cardTemplateSelector = cardTemplateSelector;
  } //.grid__template

  _handleLikeIcon(event) {
    event.target.classList.toggle("grid__icon_active");
  }
  _handleDeleteIcon(event) {
    event.target.closest(".grid__item").remove();
  }
  _handleCardImagePreview() {
    console.log(`preview photo`);
    popupImage.src = this._data.link;
    popupImage.alt = this._data.name;
    imageCaption.textContent = this._data.name;
    openPopup(imageModal);
  }

  _setEventListeners() {
    const cardLikeIcon = this._cardElement.querySelector(".grid__icon");
    const cardDeleteIcon = this._cardElement.querySelector(
      ".grid__delete-icon"
    );

    //like button
    cardLikeIcon.addEventListener("click", this._handleLikeIcon);
    //delete button
    cardDeleteIcon.addEventListener("click", this._handleDeleteIcon);
    //preview card image
    this._cardImage.addEventListener("click", () =>
      this._handleCardImagePreview()
    );
  }

  createCard() {
    const cardTemplate = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".grid__item");
    this._cardElement = cardTemplate.cloneNode(true);

    this._cardImage = this._cardElement.querySelector(".grid__image");
    this._cardText = this._cardElement.querySelector(".grid__text");

    this._cardText.textContent = this._data.name;
    this._cardImage.style.backgroundImage = `url(${this._data.link})`;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
