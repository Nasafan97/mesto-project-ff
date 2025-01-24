// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContent = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (card) {
    cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardImageLink = cardElement.querySelector('.card__image');
    cardImageAlt =cardElement.querySelector('.card__image');
    cardTitle = cardElement.querySelector('.card__title');

    cardImageLink.src = card.link;
    cardImageAlt.alt = card.name;
    cardTitle.textContent = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    const cardElement = card.target.closest('.card');
    cardElement.remove();
    // card.remove();  На самом деле я сначала пробовала этот вариант, но тогда вообще ничего не удалялось, потом удалялся только последний элемент, причем при нажатии на любую кнопку "удалить" и я не понимаю как это исправить.
}


// @todo: Вывести карточки на страницу
initialCards.forEach((elem) => {
    cardContent.append(createCard(elem));
})



