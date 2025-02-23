import { openPopup } from "./modal.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(card, like, createPopupImage) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardElement.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__like-button")) {
      like(evt);
    }
    if (evt.target.classList.contains("card__image")) {
      createPopupImage(cardImage, cardTitle);
    }
    if (evt.target.classList.contains("card__delete-button")) {
      deleteCard(cardElement);
    }
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Функция лайка карточки
function likeImage(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция создания попапа карточки, которая также вызывает открытие попапа-картинки
function createPopupCard(image, title) {
  const popupImageCard = document.querySelector(".popup_type_image");
  const popupImage = popupImageCard.querySelector(".popup__image");
  const popupCaption = popupImageCard.querySelector(".popup__caption");

  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = title.textContent;

  openPopup(popupImageCard);
}
export { initialCards, createCard, likeImage, createPopupCard };
