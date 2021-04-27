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
  api
    .removeCard(selectedCard.getId())
    .then((res) => {
      selectedCard.handleDeleteIcon(selectedCard.getId());
      deleteConfirmationPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
deleteConfirmationPopup.setEventListeners();


function makeCard({res}) {
  const card = new Card(
    res,
    userInfo.getPersistedUserInfo(),
    () => {
      imagePreviewModal.open(res.link, res.name);
    },
    () => {
      selectedCard = card;
      deleteConfirmationPopup.open(); //confirmation popup
    },
    () => {
      //if card is already liked
      if (card.isLiked()) {
        api
          .deleteLike(card.getId())
          .then((res) => {
            card.updateLikeCount(res.likes.length);
            card.updateLikeIconState(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //if card is not liked
        api
          .changeLikeCardStatus(card.getId())
          .then((res) => {
            card.updateLikeCount(res.likes.length);
            card.updateLikeIconState(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );

  return card;
}



api.getInitialData().then((values) => {

  const info = values[0];
  const cards = values[1];

   userInfo.setUserInfo({
     newName: info.name,
     newJob: info.about,
     avatar: info.avatar,
   });

   //store user data in local-storage
   userInfo.setPersistedUserInfo(info);

  initializeCards(cards);
 })

//call above function
function initializeCards(res) {
  const initialCardSection = new Section(
    {
      items: res,
      renderer: (res) => {
        const newCard = makeCard({ res: res });
        const cardElement = newCard.createCard();

        initialCardSection.addItem(cardElement);
      },
    },
    ".grid__container"
  );
  initialCardSection.renderer();

  const imageFormPopup = new PopupWithForm(".modal_type_add-card", (data) => {
    api.addCard(data).then((res) => {
      const newCardPrepend = makeCard({ res: res });
      initialCardSection.prepend(newCardPrepend.createCard());
      imageFormPopup.close();
    });
  });

  imageFormPopup.setEventListeners();

  addCardButton.addEventListener("click", function () {
    imageFormPopup.open();
  });
}
//

// USER INFO
const userInfo = new UserInfo({
  userName: ".profile__title",
  userJob: ".profile__description",
  avatar: ".profile__image",
});


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
      })
      .catch((err) => {
        console.log(err);
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
  api.setUserAvatar({ avatar: value.link })
    .then((res) => {
    userInfo.setUserInfo({
      newName: res.name,
      newJob: res.about,
      avatar: res.avatar,
    });
    avatarPopup.close();
    })
    .catch((err) => {
        console.log(err);
      });
});
avatarPopup.setEventListeners();

avatarOverlayIcon.addEventListener("click", function () {
  avatarPopup.open();
});
