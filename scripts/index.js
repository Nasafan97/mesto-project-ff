// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContent = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (card) {
    cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    cardContent.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    const cardElement = card.target.closest('.card');
    cardElement.remove();
}


// @todo: Вывести карточки на страницу
initialCards.forEach((elem) => {
    createCard(elem, deleteCard);
})



