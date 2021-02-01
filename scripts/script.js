//open buttons
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
const cardTemplate = document.querySelector(".grid__template").content.querySelector(".grid__item");
const cardContainer = document.querySelector(".grid__container");

function toggleModalWindow(modal) {
    modal.classList.toggle("modal_open");
}
// Input data then Open
function openModal() {
    titleInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    toggleModalWindow(editModal);
}
editButton.addEventListener("click", openModal);

//close modal
closeButton.addEventListener("click", () => {
    toggleModalWindow(editModal);
});

//submit form and close
function submitProfileForm(event) {
    event.preventDefault();
    profileTitle.textContent = titleInput.value;
    profileDescription.textContent = descriptionInput.value;

    toggleModalWindow(editModal);
}
profileEditForm.addEventListener("submit", submitProfileForm);

//NEW MODAL
addCardButton.addEventListener("click", () => {
    toggleModalWindow(addCardModal);
});
cardCloseButton.addEventListener("click", () => {
    toggleModalWindow(addCardModal);
});
// close image
closeImageButton.addEventListener("click", () => {
    toggleModalWindow(imageModal);
});

// SPRINT 5

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


function createCardElement(name, link){
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector(".grid__image");
    const cardText = cardElement.querySelector(".grid__text");
    const cardLikeIcon = cardElement.querySelector(".grid__icon");
    const cardDeleteIcon = cardElement.querySelector(".grid__delete-icon");
    
    cardText.textContent = name;
    cardImage.style.backgroundImage = `url(${link})`;
   
    cardLikeIcon.addEventListener("click", () => {
        cardLikeIcon.classList.toggle("grid__icon_active");
    });
    
    cardDeleteIcon.addEventListener("click", () => {
        cardElement.remove();
    });
    
    cardImage.addEventListener("click", () => {
        popupImage.src = link;
        popupImage.alt = name;
        imageCaption.textContent = name;
        toggleModalWindow(imageModal);
    });
    return cardElement;
}

initialCards.forEach((data) => {
    const cardElement = createCardElement(data.name ,data.link)
    cardContainer.prepend(cardElement);
});



function addCard(event) {
    event.preventDefault();
    const cardElement = createCardElement( nameInput.value ,`${imageInput.value}`);
  
    cardContainer.prepend(cardElement);

    nameInput.value = "";
    imageInput.value = "";

    toggleModalWindow(addCardModal);
}
newCardForm.addEventListener("submit", addCard);


