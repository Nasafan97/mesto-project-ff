// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContent = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (card) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();  // Большое большое спасибо за наставления!
}


// @todo: Вывести карточки на страницу
initialCards.forEach((elem) => {
    cardContent.append(createCard(elem));
})



