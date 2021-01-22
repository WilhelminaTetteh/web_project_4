let editButton = document.querySelector(".profile__edit");
let modal = document.querySelector(".modal");
let closeButton = document.querySelector(".modal__button");
let form = document.querySelector(".form");
let titleInput = document.querySelector(".form__input_type_title");
let descriptionInput = document.querySelector(".form__input_type_description");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");

function openModal() {
    titleInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;

    modal.classList.add("modal_open");

}
editButton.addEventListener("click", openModal);

function closeModal() {
    modal.classList.remove("modal_open");
}
closeButton.addEventListener("click", closeModal);

function submitForm(event) {
    event.preventDefault();
    profileTitle.textContent = titleInput.value;
    profileDescription.textContent = descriptionInput.value;

    closeModal();
}
form.addEventListener("submit", submitForm);
