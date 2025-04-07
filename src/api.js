const token = '8dbe2058-c3e9-43bd-bec4-3024a54b8cad';
const serverAdress = 'https://nomoreparties.co/v1/wff-cohort-32';

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
};

function getCardsData() {
    return fetch(`${serverAdress}/cards`, {
        method: "GET",
        headers: {
          authorization: token
        }
      })
        .then(handleResponse)
};

function editProfile(newName, newAbout) {
    return fetch(`${serverAdress}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: token,
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
      })
      .then(handleResponse)
};

function getProfile() {
    return fetch(`${serverAdress}/users/me`, {
        method: "GET",
        headers: {
          authorization: token,
        }
    })
        .then(handleResponse)  
};

function createNewCard(nameCard, linkCard) {
    return fetch(`${serverAdress}/cards`, {
        method: "POST",
        headers: {
          authorization: token,
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
            name: nameCard,
            link: linkCard
        })
      })
      .then(handleResponse)
};

function likeCard(cardId) {
    return fetch(`${serverAdress}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
          authorization: token
        }
    })   
    .then(handleResponse)
};

function unLikeCard(cardId) {
    return fetch(`${serverAdress}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: token
        }
    })
    .then(handleResponse)
};

function confirmDeleteCard(cardId) {
    return fetch(`${serverAdress}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: token
        }
    })
    .then(handleResponse)
};


function changeAvatar(newAvatar) {
    return fetch(`${serverAdress}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: token,
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
            avatar: newAvatar,
        })
    })
    .then(handleResponse)
};

export { getCardsData, editProfile, getProfile, createNewCard, likeCard, unLikeCard, confirmDeleteCard, changeAvatar };