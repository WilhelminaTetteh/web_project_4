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
// let modalWindow = document.querySelector(".modal");
const editModal = document.querySelector(".modal_type_edit-profile");
const addCardModal = document.querySelector(".modal_type_add-card");
const imageModal = document.querySelector(".modal_type_image");

//Close buttons
const closeButton = editModal.querySelector(".modal__button");
const cardCloseButton = addCardModal.querySelector(".modal__button");
const closeImageButton = imageModal.querySelector(".modal__button");
// form inputs etc
const profileEditForm = document.querySelector(".form");
const newCardForm = document.querySelector(".form_type_card");
const titleInput = document.querySelector(".form__input_type_title");
const descriptionInput = document.querySelector(".form__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector(".form__input_type_card-title");
const imageInput = document.querySelector(".form__input_type_url");
const popupImage = imageModal.querySelector(".modal__image");
const imageCaption = imageModal.querySelector(".modal__image-caption");
// const cardTemplate = document.querySelector(".grid__template").content.querySelector(".grid__item");
// const cardContainer = document.querySelector(".grid__container");//PLACESLIST


// open and close Modals
function openPopup(modalOpen) {
  modalOpen.classList.add("modal_open");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(modalClose) {
  modalClose.classList.remove("modal_open");
  document.removeEventListener("keydown", closeByEscape);
}


function closeByEscape(evt) {
    const activeModal = document.querySelector(".modal_open");
    if (evt.key === "Escape") {
      closePopup(activeModal);
    }
  }

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

//handles- like- delete
const handleLikeIcon = (event) => {
  event.target.classList.toggle("grid__icon_active");
};
const handleDeleteIcon = (event) => {
  event.target.closest(".grid__item").remove();
};

const handleCardImagePreview = card => {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  imageCaption.textContent = card.name;
  openPopup(imageModal);
};

// SPRINT 5



// function createCardElement(name, link) {
//   const cardElement = cardTemplate.cloneNode(true);

//   const cardImage = cardElement.querySelector(".grid__image");
//   const cardText = cardElement.querySelector(".grid__text");
//   const cardLikeIcon = cardElement.querySelector(".grid__icon");
//   const cardDeleteIcon = cardElement.querySelector(".grid__delete-icon");

//   cardText.textContent = name;
//   cardImage.style.backgroundImage = `url(${link})`;

//   cardLikeIcon.addEventListener("click", () => {
//     cardLikeIcon.classList.toggle("grid__icon_active");
//   });

//   cardDeleteIcon.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   cardImage.addEventListener("click", () => {
//     popupImage.src = link;
//     popupImage.alt = name;
//     imageCaption.textContent = name;
//     openPopup(imageModal);
//   });
//   return cardElement;
// }

// initialCards.forEach((data) => {
//   const cardElement = createCardElement(data.name, data.link);
//   cardContainer.prepend(cardElement);
// });

// function addCard(event) {
//   event.preventDefault();
//   const cardElement = createCardElement(nameInput.value, `${imageInput.value}`);

//   cardContainer.prepend(cardElement);

//   closePopup(addCardModal);
// }
// newCardForm.addEventListener("submit", addCard);

////////
//WRAPPERS
////////
const cardContainer = document.querySelector(".grid__container");//PLACESLIS

function createCardElement(card) {
  
  const cardTemplate = document.querySelector(".grid__template").content.querySelector(".grid__item");
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".grid__image");
  const cardText = cardElement.querySelector(".grid__text");
  const cardLikeIcon = cardElement.querySelector(".grid__icon");
  const cardDeleteIcon = cardElement.querySelector(".grid__delete-icon");

  cardText.textContent = card.name;
  cardImage.style.backgroundImage = `url(${card.link})`;
//like button
  cardLikeIcon.addEventListener("click", handleLikeIcon);
//delete button
  cardDeleteIcon.addEventListener("click", handleDeleteIcon);
//preview cardimage
  cardImage.addEventListener("click", () => handleCardImagePreview(card));

  
  return cardElement;
};

// when i call renderCard, i want to call it with card element and my own wrapper(substitute for cardContainer ul): this makes it such that i can render any card in any place

function renderCard(card, wrapper) {
  // const cardElement = createCardElement(card);
  // wrapper.append(cardElement);
  wrapper.append(createCardElement(card));
};

initialCards.forEach(card => renderCard(card, cardContainer));
 



const addCard = (event) => {
  event.preventDefault();
  const newCardName = nameInput.value;
  const newCardImage = imageInput.value;
  const newCard = {
    name: newCardName,
    link: newCardImage
  }
  const cardElement= createCardElement(newCard);
  cardContainer.prepend(cardElement);
  closePopup(addCardModal);
}
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


