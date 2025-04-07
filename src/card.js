import { likeCard, unLikeCard, confirmDeleteCard } from "./api.js";
import { openPopup, closePopup } from "./modal.js";
import { popupDeleteCard } from "./index.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(card, like, showPopupImage, deleteImage, userId) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const countLike = cardElement.querySelector(".card__like-count");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  if (userId !== card.owner._id) {
    deleteButton.classList.add("card__delete-button-hidden");
  }

  cardElement.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__like-button")) {
      like(evt);
      if (evt.target.classList.contains("card__like-button_is-active")) {
        likeCard(card._id)
          .then((card) => {
            if (card.likes.length !== 0) {
              countLike.classList.remove("card__like-count-inactive");
            }
            countLike.textContent = card.likes.length;
          })
          .catch((error) =>
            console.error("Ошибка вывода количества лайков карточки:", error)
          );
      } else {
        unLikeCard(card._id)
          .then((card) => {
            if (card.likes.length === 0) {
              countLike.classList.add("card__like-count-inactive");
            } else {
              countLike.textContent = card.likes.length;
            }
          })
          .catch((error) =>
            console.error("Ошибка вывода количества лайков карточки:", error)
          );
      }
    } else if (evt.target.classList.contains("card__image")) {
      showPopupImage(cardImage, cardTitle);
    } else if (evt.target.classList.contains("card__delete-button")) {
      openPopup(popupDeleteCard);
      popupDeleteCard.addEventListener(
        "click",
        () => {
          deleteImage(cardElement, card._id);
          closePopup(popupDeleteCard);
        },
        { once: true }
      );
    }
  });

  return cardElement;
}

// @todo: Функция удаления карточки, в том числе с сервера
function deleteCard(card, cardId) {
  card.remove();
  confirmDeleteCard(cardId).catch((error) =>
    console.error("Ошибка удаления карточки:", error)
  );
}

// @todo: Функция лайка карточки
function likeImage(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, likeImage, deleteCard };
