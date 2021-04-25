import "../pages/index.css";

import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupAlert from "../scripts/components/PopupAlert.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Api from "../scripts/components/Api.js";
import {
  initialCards,
  editButton,
  addCardButton,
  titleInput,
  descriptionInput,
  profileImage,
  avatarOverlayIcon,
} from "../scripts/utils/constants.js";
//
//

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

const avatarFormValidator = new FormValidator(
  config,
  document.querySelector(".form_type_avatar")
);

//call enableValidation() on both forms instances

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();


let selectedCard = null;

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-7",
  authToken: "47c83c4f-319d-4409-b351-cc8f7164bc50",
});

// DELETE POPUP
const deleteConfirmationPopup = new PopupAlert(".modal_type_delete", () => {
  //
  api.removeCard(selectedCard.getId()).then((res) => {
    selectedCard.handleDeleteIcon(selectedCard.getId());
    deleteConfirmationPopup.close();
  });
});
deleteConfirmationPopup.setEventListeners();

//call above function
api.getCardList().then((res) => {
  // console.log(`!!!`, res);
  const initialCardSection = new Section(
    {
      items: res,
      renderer: (res) => {
        const newCard = new Card(
          res,
          userInfo.getPersistedUserInfo(),
          () => {
            imagePreviewModal.open(res.link, res.name);
          },
          () => {
            selectedCard = newCard;
            deleteConfirmationPopup.open(); //confirmation popup
          },
          () => {
            //if card is already liked
            if (newCard.isLiked()) {
              api.deleteLike(newCard.getId()).then((res) => {
                newCard.updateLikeCount(res.likes.length);
                newCard.updateLikeIconState(false);
              });
            } else {
              //if card is not liked
              api.changeLikeCardStatus(newCard.getId()).then((res) => {
                newCard.updateLikeCount(res.likes.length);
                newCard.updateLikeIconState(true);
              });
            }
          }
        );
        const cardElement = newCard.createCard();

        initialCardSection.addItem(cardElement);
      },
    },
    ".grid__container"
  );
  initialCardSection.renderer();

  const imageFormPopup = new PopupWithForm(".modal_type_add-card", (data) => {
    api.addCard(data).then((res) => {
      const newCardPrepend = new Card(
        res,
        userInfo.getPersistedUserInfo(),
        () => {
          imagePreviewModal.open(res.link, res.name);
        },
        () => {
          selectedCard = newCardPrepend;
          deleteConfirmationPopup.open(); //confirmation popup
        },
        () => {
          //if new card is already liked
          if (newCardPrepend.isLiked()) {
            api.deleteLike(newCardPrepend.getId()).then((res) => {
              newCardPrepend.updateLikeCount(res.likes.length);
              newCardPrepend.updateLikeIconState(false);
            });
          } else {
            //if newcard is not liked
            api.changeLikeCardStatus(newCardPrepend.getId()).then((res) => {
              newCardPrepend.updateLikeCount(res.likes.length);
              newCardPrepend.updateLikeIconState(true);
            });
          }
        }
      );
      initialCardSection.prepend(newCardPrepend.createCard());
      imageFormPopup.close();
    });
  });

  imageFormPopup.setEventListeners();

  addCardButton.addEventListener("click", function () {
    imageFormPopup.open();
  });
});
//

// USER INFO
const userInfo = new UserInfo({
  userName: ".profile__title",
  userJob: ".profile__description",
  avatar: ".profile__image",
});
//User Info
api.getInfo().then((res) => {
  // console.log(`profile!!`, res);
  userInfo.setUserInfo({
    newName: res.name,
    newJob: res.about,
    avatar: res.avatar,
  });

  //store user data in local-storage
  userInfo.setPersistedUserInfo(res);

});


// IMAGE POPUP

const imagePreviewModal = new PopupWithImage(".modal_type_image");
imagePreviewModal.setEventListeners();

// EDIT FORM
const editProfilePopup = new PopupWithForm(
  ".modal_type_edit-profile",
  (values) => {
    // console.log(values);
    api
      .updateUserInfo({ name: values.title, about: values.description })
      .then((res) => {
        // console.log(`profile!!`, res);
        userInfo.setUserInfo({
          newName: res.name,
          newJob: res.about,
          avatar: res.avatar,
        });
        editProfilePopup.close();
      });
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
//

const avatarPopup = new PopupWithForm(".modal_type_avatar", (value) => {
  // console.log(value.link);
  api.setUserAvatar({ avatar: value.link }).then((res) => {
    userInfo.setUserInfo({
      newName: res.name,
      newJob: res.about,
      avatar: res.avatar,
    });
    avatarPopup.close();
  });
});
avatarPopup.setEventListeners();

avatarOverlayIcon.addEventListener("click", function () {
  avatarPopup.open();
});
