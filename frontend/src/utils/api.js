 class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _getHeaders() {
        const token = localStorage.getItem('jwt');
        return {
            Authorization: `Bearer ${token}`,
            ...this.headers,
        };
    }

    //Загрузка информации о пользователе с сервера
    getUserProfile() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this._getHeaders(),
        })
            .then(this._checkResponse);
    }

    //Отправка новой информации о пользователе на сервер
    profileEdit(data) {
        return fetch(`${this.baseUrl}/users/me`, {
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
        return fetch(`${this.baseUrl}/users/me/avatar`, {
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
        return fetch(`${this.baseUrl}/cards`, {
            headers: this._getHeaders(),
        })
            .then(this._checkResponse);
    }

    //Добавление карточек на сервер
    addNewCard(obj) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: obj.name,
                link: obj.link
            })
        })
            .then(this._checkResponse);
    }

    //Удаление карточки
    deleteCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
            .then(this._checkResponse);
    }


    //Поставить/удалить лайк карточке
    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this.baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this._getHeaders(),
            })
                .then((res) => this._checkResponse(res))
        } else {
            return fetch(`${this.baseUrl}/cards/${id}/likes`, {
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
        'content-type': 'application/json',
        'Accept': 'application/json',
    }
});
