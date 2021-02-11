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

// open and close Modals
function openPopup(modalOpen){
    modalOpen.classList.add("modal_open");
}

function closePopup(modalClose){
    modalClose.classList.remove("modal_open");
}
// Escape Functionality
function closeByEscape(evt){
    if(evt.key === 'Escape') {
        closePopup(editModal);
        closePopup(addCardModal);
        closePopup(imageModal);
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
        openPopup(imageModal);
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

    closePopup(addCardModal);     
}
newCardForm.addEventListener("submit", addCard);




//close popups when  click on overlay

editModal.addEventListener('click', (evt) => {
    if(evt.target === editModal){
        closePopup(editModal);
    }
    
});
addCardModal.addEventListener('click', (evt) => {
    if(evt.target === addCardModal){
        closePopup(addCardModal);
    }
    
});
imageModal.addEventListener('click', (evt) => {
    if(evt.target === imageModal){
        closePopup(imageModal);
    }
    
});

document.addEventListener('keyup', (evt) => {
    if(evt.key === 'Escape') {
        closePopup(editModal);
        closePopup(addCardModal);
        closePopup(imageModal);
    }
});


document.addEventListener('keydown',closeByEscape);
document.removeEventListener('keydown',closeByEscape);