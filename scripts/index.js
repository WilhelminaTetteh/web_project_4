import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import {
  imageModal,
  popupImage,
  imageCaption,
  openPopup,
  closePopup,
  closeByEscape,
} from "./utils.js";

const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const editProfileFormValidator = new FormValidator(
  config,
  document.querySelector(".form")
); //pass in some parameters
const addCardFormValidator = new FormValidator(
  config,
  document.querySelector(".form_type_card")
);

//call enableValidation() on both forms instances

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
];

//open modal buttons
const editButton = document.querySelector(".profile__edit");
const addCardButton = document.querySelector(".profile__add");

//Wrappers-modals
const editModal = document.querySelector(".modal_type_edit-profile");
const addCardModal = document.querySelector(".modal_type_add-card");

//Close buttons
const closeButton = editModal.querySelector(".modal__button");
const cardCloseButton = addCardModal.querySelector(".modal__button");
const closeImageButton = imageModal.querySelector(".modal__button");
// form inputs etc
const profileEditForm = document.querySelector(".form");
const newCardForm = document.querySelector(".form_type_card");
const titleInput = document.querySelector(".form__input_type_title");
const descriptionInput = document.querySelector(
  ".form__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector(".form__input_type_card-title");
const imageInput = document.querySelector(".form__input_type_url");
const cardTemplate = document
  .querySelector(".grid__template")
  .content.querySelector(".grid__item");
const cardContainer = document.querySelector(".grid__container");

// Input data then Open
function openModal() {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(editModal);
}
editButton.addEventListener("click", openModal);

//close modal
closeButton.addEventListener("click", () => {
  closePopup(editModal);
});

//submit form and close
function submitProfileForm(event) {
  event.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(editModal);
}

//CREATE CARD

function createCardElement(data) {
  const card = new Card(data, ".grid__template");
  const cardElement = card.createCard();
  return cardElement;
}

//RENDER CARD

function renderCard(data, wrapper) {
  wrapper.append(createCardElement(data));
}

//INITIAL CARDS

initialCards.forEach((data) => renderCard(data, cardContainer));

const addCard = (event) => {
  event.preventDefault();
  const newCardName = nameInput.value;
  const newCardImage = imageInput.value;
  const newCard = {
    name: newCardName,
    link: newCardImage,
  };
  const cardElement = createCardElement(newCard);
  cardContainer.prepend(cardElement);
  closePopup(addCardModal);
};
newCardForm.addEventListener("submit", addCard);

//close popups when  click on overlay

editModal.addEventListener("click", (evt) => {
  if (evt.target === editModal) {
    closePopup(editModal);
  }
});
addCardModal.addEventListener("click", (evt) => {
  if (evt.target === addCardModal) {
    closePopup(addCardModal);
  }
});
imageModal.addEventListener("click", (evt) => {
  if (evt.target === imageModal) {
    closePopup(imageModal);
  }
});

profileEditForm.addEventListener("submit", submitProfileForm);

//NEW MODAL
addCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});
cardCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});
// close image
closeImageButton.addEventListener("click", () => {
  closePopup(imageModal);
});
