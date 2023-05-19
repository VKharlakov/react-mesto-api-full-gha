class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers
    }

    _returnResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Была допущена ошибка: ${res.status}`)
        }
    }

    //Получение данных о пользователе
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => this._returnResponse(res))
    }

    //Изменение данных пользователя
    patchUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then((res) => this._returnResponse(res))
    }

    //Изменение аватара пользователя
    editUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then((res) => this._returnResponse(res))
    }

    //Получение списка изначальных фотографий
    getInitialCardSet() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then((res) => this._returnResponse(res))
    }

    //Отправка новой фотографии
    postNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
            .then((res) => this._returnResponse(res))
    }

    //Удаление фотографии
    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => this._returnResponse(res))
    }

    //Изменение статуса кнопки "Оценить"
    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers
        })
            .then((res) => this._returnResponse(res))
    }
}

const api = new Api({
    baseUrl: 'https://mesto.students.vkharlakov.nomoredomains.monster/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api