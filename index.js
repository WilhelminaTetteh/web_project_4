let editButton = document.querySelector(".profile__edit");
let closeButton = document.querySelector(".modal__button");
let form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let titleInput = document.querySelector(".form__input_type_title");
    let descriptionInput = document.querySelector(".form__input_type_description");

    let profileTitle = document.querySelector(".profile__title");
    let profileDescription = document.querySelector(".profile__description");

    profileTitle.textContent = titleInput.value;
    profileDescription.textContent = descriptionInput.value;

    toggleModal();

    console.log("submit!!", titleInput.value, descriptionInput.value);
});

function toggleModal() {
    let modal = document.querySelector(".modal");
    modal.classList.toggle("modal_open");
}

editButton.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
