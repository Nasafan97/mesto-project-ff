import "./pages/index.css";
import {
  createCard,
  likeImage,
  deleteCard,
} from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { clearValidation, enableValidation } from "./validation.js";
import { createNewCard, editProfile, getCardsData, getProfile, changeAvatar } from "./api.js";

// @todo: DOM узлы
const cardContent = document.querySelector(".places__list");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonNewCard = document.querySelector(".profile__add-button");
const buttonAvatarEdit = document.querySelector(".profile__image");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formEditPopup = document.forms["edit-profile"];
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const formNewCard = document.forms["new-place"];
const formAvatar = document.forms.avatar;
const nameInput = formEditPopup.elements.name;
const jobInput = formEditPopup.elements.description;
const avatarInput = formAvatar.elements["avatar-link"]; 
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


Promise.all([getProfile(), getCardsData()])
  .then(([userData, cardData]) => {
    cardData.forEach((elem) => {
      cardContent.append(createCard(elem, likeImage, openPopupCard, deleteCard, userData._id));
    });    
  })
  .catch((error) => console.error("Ошибка получения карточек с сервера:", error));



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
buttonEdit.addEventListener("click", () => {
  saveInputPopupEdit();
  clearValidation(popupEdit, validationConfig);
  openPopup(popupEdit);
});

buttonNewCard.addEventListener("click", () => {
  formNewCard.reset();
  clearValidation(popupNewCard, validationConfig);
  openPopup(popupNewCard)
});

buttonAvatarEdit.addEventListener("click", () => {
  formAvatar.reset();
  clearValidation(popupEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
});

function saveInputPopupEdit() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// @todo: Функция, которая показывает, что идёт процесс сохранения
function renderSaving(isSaving, popup) {
  if (isSaving) {
    popup.querySelector(".popup__button").textContent = "Сохранение...";
  } else {
    popup.querySelector(".popup__button").textContent = "Сохранить";
  }
};


// @todo: Редактирование аватарки
function handleFormSubmitEditAvatar(evt) {
  evt.preventDefault();
  renderSaving(true, popupEditAvatar);
  changeAvatar(avatarInput.value)
  .then((userData) => {
    buttonAvatarEdit.style.backgroundImage=`url(${userData.avatar})`;
  })
  .catch((error) => console.error("Ошибка обновления аватарки:", error))
  .finally(() => {
    renderSaving(false, popupEditAvatar);
    closePopup(popupEditAvatar);
  });  
}
popupEditAvatar.addEventListener("submit", handleFormSubmitEditAvatar);


// @todo: Редактирование имени и информации о себе
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  renderSaving(true, popupEdit);
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  editProfile(profileTitle.textContent, profileDescription.textContent)
  .catch((error) => console.error("Ошибка обновления профиля:", error))
  .finally(() => {
    renderSaving(false, popupEdit);
    closePopup(popupEdit);
  }); 
}
formEditPopup.addEventListener("submit", handleFormSubmitEdit);

document.addEventListener("DOMContentLoaded", () => {
  getProfile()
  .then((userData) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    buttonAvatarEdit.style.backgroundImage=`url(${userData.avatar})`;
  })
  .catch((error) => console.error("Ошибка загрузки профиля:", error));
})


// @todo: Добавление новой карточки при срабатывании события submit
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  renderSaving(true, popupNewCard);
  const name = formNewCard.elements["place-name"].value;
  const link = formNewCard.elements.link.value;
  createNewCard(name, link)
  .then((newCard) => {
    cardContent.prepend(createCard(newCard, likeImage, openPopupCard, deleteCard, newCard.owner._id));
  })
  .catch((error) => console.error("Ошибка создания новой карточки:", error))
  .finally(() => {
    renderSaving(false, popupNewCard);
    closePopup(popupNewCard);
  });
}
formNewCard.addEventListener("submit", handleFormSubmitNewCard);

enableValidation(validationConfig);

export { popupDeleteCard, validationConfig };
