export const imageModal = document.querySelector(".modal_type_image");
export const popupImage = imageModal.querySelector(".modal__image");
export const imageCaption = imageModal.querySelector(".modal__image-caption");

export function openPopup(modalOpen) {
  modalOpen.classList.add("modal_open");
  document.addEventListener("keydown", closeByEscape);
}

export function closePopup(modalClose) {
  modalClose.classList.remove("modal_open");
  document.removeEventListener("keydown", closeByEscape);
}

export function closeByEscape(evt) {
  const activeModal = document.querySelector(".modal_open");
  if (evt.key === "Escape") {
    closePopup(activeModal);
  }
}
