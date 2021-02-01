//open buttons
let editButton = document.querySelector(".profile__edit");
let addCardButton = document.querySelector(".profile__add");


//Wrappers-modals
// let modalWindow = document.querySelector(".modal");
let editModal = document.querySelector(".modal_type_edit-profile");
let addCardModal = document.querySelector(".modal_type_add-card");
let imageModal = document.querySelector(".modal_type_image"); 

//Close buttons
let closeButton = editModal.querySelector(".modal__button"); 
let cardCloseButton = addCardModal.querySelector(".modal__button"); 
let closeImageButton = imageModal.querySelector(".modal__button");
// form inputs etc
let form = document.querySelector(".form");
let newCardForm = document.querySelector(".form_type_card");
let titleInput = document.querySelector(".form__input_type_title");
let descriptionInput = document.querySelector(".form__input_type_description");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");

let nameInput = document.querySelector(".form__input_type_card-title");
let imageInput = document.querySelector(".form__input_type_url");
let popupImage = imageModal.querySelector(".modal__image"); 
let imageCaption = imageModal.querySelector(".modal__image-caption"); 

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
function submitForm(event) {
    event.preventDefault();
    profileTitle.textContent = titleInput.value;
    profileDescription.textContent = descriptionInput.value;

    toggleModalWindow(editModal);
}
form.addEventListener("submit", submitForm);

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

const cardTemplate = document.querySelector(".grid__template").content.querySelector(".grid__item");
const cardContainer = document.querySelector(".grid__container");

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


