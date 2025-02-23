import "./pages/index.css";
import {
  createCard,
  likeImage,
  deleteCard,
} from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import {initialCards} from "./cards.js";

// @todo: DOM узлы
const cardContent = document.querySelector(".places__list");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonNewCard = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formEditPopup = document.forms["edit-profile"];
const nameInput = formEditPopup.elements.name;
const jobInput = formEditPopup.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formNewCard = document.forms["new-place"];

// @todo: Вывести карточки на страницу
initialCards.forEach((elem) => {
  cardContent.append(createCard(elem, likeImage, openPopupCard, deleteCard));
});

// @todo: Функция создания попапа карточки, которая также вызывает открытие попапа-картинки
function openPopupCard(image, title) {
  const popupImageCard = document.querySelector(".popup_type_image");
  const popupImage = popupImageCard.querySelector(".popup__image");
  const popupCaption = popupImageCard.querySelector(".popup__caption");

  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = title.textContent;

  openPopup(popupImageCard);
}

// @todo: Добавить слушатели на Попапы с формами заполнения
buttonEdit.addEventListener("click", () => openPopup(popupEdit));
buttonNewCard.addEventListener("click", () => openPopup(popupNewCard));

// @todo: Редактирование имени и информации о себе
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
}
formEditPopup.addEventListener("submit", handleFormSubmitEdit);

function saveInputPopupEdit() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}
buttonEdit.addEventListener("click", () => saveInputPopupEdit()); //Огромное спасибо за все правки и рекомендации!!!!

// @todo: Добавление новой карточки при срабатывании события submit
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const name = formNewCard.elements["place-name"].value;
  const link = formNewCard.elements.link.value;
  const newCard = {
    name,
    link,
  };
  cardContent.prepend(createCard(newCard, likeImage, openPopupCard, deleteCard));
  closePopup(popupNewCard);
  formNewCard.reset();
}
formNewCard.addEventListener("submit", handleFormSubmitNewCard);

