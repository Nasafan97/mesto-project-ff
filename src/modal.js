import { saveInputPopupEdit } from "./index.js";

// @todo: Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  
  document.addEventListener("keydown", closePopupOnEscape);
  const buttonClose = popup.querySelector(".popup__close");
  buttonClose.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("click", closesPopupOnOverlay);
}

// @todo: Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupOnEscape);
  saveInputPopupEdit();
}

// @todo: Функция закрытия попапа по Esc
function closePopupOnEscape(evt) {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_is-opened");
    closePopup(currentPopup);
  }
}

// @todo: Функция закрытия попапа по Overlay
function closesPopupOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
export { openPopup, closePopup };
