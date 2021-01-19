let editButton = document.querySelector(".profile__edit");
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".modal__button");
let form = document.querySelector(".form");
let titleInput = document.querySelector(".form__input_type_title");
let descriptionInput = document.querySelector(".form__input_type_description");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");

// open modal on click event
editButton.addEventListener("click", function () {
    modal.classList.add("modal_open");
});

// close modal on click event

closeButton.addEventListener("click", function () {
    modal.classList.remove("modal_open");
});

// replace info on submit event and close

form.addEventListener("submit", (event) => {
    event.preventDefault();
    profileTitle.textContent = titleInput.value;
    profileDescription.textContent = descriptionInput.value;

    modal.classList.remove("modal_open");
});
