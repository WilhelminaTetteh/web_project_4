import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import {
  imageModal,
  popupImage,
  imageCaption,
  openPopup,
  closePopup,
  closeByEscape,
} from "../scripts/utils/utils.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";

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

// //Wrappers-modals
// const editModal = document.querySelector(".modal_type_edit-profile");
// const addCardModal = document.querySelector(".modal_type_add-card");

// //Close buttons
// const closeButton = editModal.querySelector(".modal__button");
// const cardCloseButton = addCardModal.querySelector(".modal__button");
// const closeImageButton = imageModal.querySelector(".modal__button");
// // form inputs etc
// const profileEditForm = document.querySelector(".form");
// const newCardForm = document.querySelector(".form_type_card");
// const titleInput = document.querySelector(".form__input_type_title");
// const descriptionInput = document.querySelector(
//   ".form__input_type_description"
// );
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");

// const nameInput = document.querySelector(".form__input_type_card-title");
// const imageInput = document.querySelector(".form__input_type_url");
// const cardTemplate = document
//   .querySelector(".grid__template")
//   .content.querySelector(".grid__item");
// const cardContainer = document.querySelector(".grid__container");

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
  console.log(newCardPrepend);
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
console.log(`this is -${userInfo}`);
// EDIT FORM
const editProfilePopup = new PopupWithForm(
  ".modal_type_edit-profile",
  (values) => {
    userInfo.setUserInfo(values.title, values.description);
    console.log(`EDIT FORM FUNCTION`);

    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();
//EDIT BUTTON CLICK
editButton.addEventListener("click", function () {
  editProfilePopup.open();
});
// // USER INFO

// // PROFILE POPUP

// const editProfilePopup = new PopupWithForm({
//   popupSelector: ".modal_type_edit-profile",
//   submitHandler: (values) => {
//     userInfo.setUserInfo(values.userName, values.userJob);

//     editProfilePopup.close();
//   },
// });
// editProfilePopup.setEventListeners();
// //
// editButton.addEventListener("click", function () {
//   editProfilePopup.open();
//   const getValues = userInfo.getUserInfo();
//   currentName.value = getValues.name;
//   currentJob.value = getValues.description;
// });

//
//
//
//
//
//
//
//
//
//
//
//
//
// // Input data then Open
// function openModal() {
//   titleInput.value = profileTitle.textContent;
//   descriptionInput.value = profileDescription.textContent;
//   openPopup(editModal);
// }
// editButton.addEventListener("click", openModal);

// //close modal
// closeButton.addEventListener("click", () => {
//   closePopup(editModal);
// });

// //submit form and close
// function submitProfileForm(event) {
//   event.preventDefault();
//   profileTitle.textContent = titleInput.value;
//   profileDescription.textContent = descriptionInput.value;

//   closePopup(editModal);
// }

// //CREATE CARD

// function createCardElement(data) {
//   const card = new Card(data, ".grid__template");
//   const cardElement = card.createCard();
//   return cardElement;
// }

// //RENDER CARD

// function renderCard(data, wrapper) {
//   wrapper.append(createCardElement(data));
// }

// //INITIAL CARDS

// initialCards.forEach((data) => renderCard(data, cardContainer));

// const addCard = (event) => {
//   event.preventDefault();
//   const newCardName = nameInput.value;
//   const newCardImage = imageInput.value;
//   const newCard = {
//     name: newCardName,
//     link: newCardImage,
//   };
//   const cardElement = createCardElement(newCard);
//   cardContainer.prepend(cardElement);
//   closePopup(addCardModal);
// };
// newCardForm.addEventListener("submit", addCard);

// //close popups when  click on overlay

// editModal.addEventListener("click", (evt) => {
//   if (evt.target === editModal) {
//     closePopup(editModal);
//   }
// });
// addCardModal.addEventListener("click", (evt) => {
//   if (evt.target === addCardModal) {
//     closePopup(addCardModal);
//   }
// });
// imageModal.addEventListener("click", (evt) => {
//   if (evt.target === imageModal) {
//     closePopup(imageModal);
//   }
// });

// profileEditForm.addEventListener("submit", submitProfileForm);

// //NEW MODAL
// addCardButton.addEventListener("click", () => {
//   openPopup(addCardModal);
// });
// cardCloseButton.addEventListener("click", () => {
//   closePopup(addCardModal);
// });
// // close image
// closeImageButton.addEventListener("click", () => {
//   closePopup(imageModal);
// });
