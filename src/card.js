import { likeCard, unLikeCard } from "./api.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(card, like, showPopupImage, deleteCard, userId) {
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
      like(card._id, countLike, evt);
    } else if (evt.target.classList.contains("card__image")) {
      showPopupImage(cardImage, cardTitle);
    } else if (evt.target.classList.contains("card__delete-button")) {
      deleteCard(cardElement, card._id);
    }
  });

  return cardElement;
}

// @todo: Функции лайка карточки - я тут поясняющие комментарии для себя писала, а ещё хочу сказать большое спасибо за все советы!
function likeCallback(cardId, likeCounter, evt) {
  const isLiked = evt.target.classList.contains("card__like-button_is-active"); // Если у кнопки лайка есть данный класс, то сохранится значение true, иначе - false
  const likeMethod = isLiked ? unLikeCard : likeCard; // При первом нажатии на сердечко у него ещё не появляется активный класс, поэтому isLiked вернёт false, но при этом лайк поставлен, значит надо вызвать функцию likeCard
  likeMethod(cardId)
    .then((card) => {
      evt.target.classList.toggle("card__like-button_is-active");
      likeCounter.classList.toggle(
        "card__like-count-inactive",
        card.likes.length === 0
      ); // Если у карточки нет лайков, то блок с количеством лайков скроется, а иначе - появится
      likeCounter.textContent = card.likes.length || ""; // Если длина равна нулю, то ноль рассматривается как false и подставляется пустая строка, только я не совсем понимаю зачем это делать, т.к при нуле этот span и так будет скрыт
    })
    .catch((error) =>
      console.error("Ошибка вывода количества лайков карточки:", error)
    );
}

export { createCard, likeCallback };
