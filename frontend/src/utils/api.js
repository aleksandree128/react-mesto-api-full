export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _getHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Authorization': `Bearer ${token}`,
            ...this._headers,
        };
    }

    //Загрузка информации о пользователе с сервера
    getUserProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getHeaders(),
        })
            .then(this._checkResponse);
    }

    //Отправка новой информации о пользователе на сервер
    profileEdit(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkResponse);
    }

    //Обновление аватара пользователя
    editAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkResponse);
    }

    //Загрузка информации карточек с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._getHeaders(),
        })
            .then(this._checkResponse);
    }

    //Добавление карточек на сервер
    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse);
    }

    //Удаление карточки
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
            .then(this._checkResponse);
    }

    //Поставить/удалить лайк карточке
    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this._getHeaders(),
            })
                .then((res) => this._checkResponse(res))
        } else {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._getHeaders(),
            })
                .then((res) => this._checkResponse(res))
        }
    }

}

//подключение апи
export const api = new Api({
    baseUrl: 'https://api.domainname.students.nomorepartiesxyz.ru',
    headers: {
        'content-type': 'application/json'
    }
});
