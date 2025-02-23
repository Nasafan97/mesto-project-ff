import { saveInputPopupEdit } from "./index.js";

// @todo: Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  
  document.addEventListener("keydown", closePopupOnEscape);
  popup.addEventListener("click", closesPopupOnOverlayOrButton);
}

// @todo: Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupOnEscape);
}

// @todo: Функция закрытия попапа по Esc
function closePopupOnEscape(evt) {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_is-opened");
    closePopup(currentPopup);
  }
}

// @todo: Функция закрытия попапа по Overlay или по крестику
function closesPopupOnOverlayOrButton(evt) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
}

export { openPopup, closePopup };
