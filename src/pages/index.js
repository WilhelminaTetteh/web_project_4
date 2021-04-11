import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import {
  editButton,
  addCardButton,
  titleInput,
  descriptionInput,
} from "../scripts/utils/constants.js";
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

// //open modal buttons
// const editButton = document.querySelector(".profile__edit");
// const addCardButton = document.querySelector(".profile__add");
// // Profile inputs
// const titleInput = document.querySelector(".form__input_type_title");
// const descriptionInput = document.querySelector(
//   ".form__input_type_description"
// );

// IMAGE POPUP
const imagePreviewModal = new PopupWithImage(".modal_type_image");
imagePreviewModal.setEventListeners();

const initialCardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const newCard = new Card(data, () => {
        imagePreviewModal.open(data.link, data.name);
      });
      const cardElement = newCard.createCard();

      initialCardSection.addItem(cardElement);
    },
  },
  ".grid__container"
);
initialCardSection.renderer();

// ADD CARD POPUP

const imageFormPopup = new PopupWithForm(".modal_type_add-card", (data) => {
  const newCardPrepend = new Card(data, () => {
    imagePreviewModal.open(data.link, data.name);
  });
  initialCardSection.prepend(newCardPrepend.createCard());
  imageFormPopup.close();
});
imageFormPopup.setEventListeners();

addCardButton.addEventListener("click", function () {
  imageFormPopup.open();
});

// USER INFO
const userInfo = new UserInfo({
  userName: ".profile__title",
  userJob: ".profile__description",
});
// EDIT FORM
const editProfilePopup = new PopupWithForm(
  ".modal_type_edit-profile",
  (values) => {
    userInfo.setUserInfo(values.title, values.description);

    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();
//EDIT BUTTON CLICK
editButton.addEventListener("click", function () {
  const getValue = userInfo.getUserInfo();
  titleInput.value = getValue.userName;
  descriptionInput.value = getValue.userJob;
  editProfilePopup.open();
});
