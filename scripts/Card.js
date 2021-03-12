import {popupImage,imageCaption, imageModal, openPopup, closePopup, closeByEscape} from './utils';

class Card {
  constructor(data, cardTemplateSelector) {
    this._data = data
    this._cardTemplateSelector = cardTemplateSelector
  } //.grid__template
  _handleLikeIcon(event) {
  event.target.classList.toggle("grid__icon_active");
    
  }
  _handleDeleteIcon() {
  this._cardElement.remove();
    
  }
  _handleCardImagePreview() {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  imageCaption.textContent = data.name;
  openPopup(imageModal);
  }

  _setEventListeners() {
  const cardLikeIcon = this._cardElement.querySelector(".grid__icon");
  const cardDeleteIcon = this._cardElement.querySelector(".grid__delete-icon");
    
      //like button
  cardLikeIcon.addEventListener("click", handleLikeIcon);
//delete button
  cardDeleteIcon.addEventListener("click", handleDeleteIcon);
//preview card image
  this._cardImage.addEventListener("click", () => handleCardImagePreview(data));
  }
  

  createCard() {
  const cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector(".grid__item");
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