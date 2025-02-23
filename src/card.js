// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(card, like, showPopupImage, deleteImage) {
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
    else if (evt.target.classList.contains("card__image")) {
      showPopupImage(cardImage, cardTitle);
    }
    else if (evt.target.classList.contains("card__delete-button")) {
      deleteImage(cardElement);
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

export { createCard, likeImage, deleteCard };
